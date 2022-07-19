const defaultOptions = {
  loop: false,
  animateCursor: true,

  blinkSpeed: 400,

  typeSpeed: 90,
  deleteSpeed: 40,

  typeSpeedMin: 65,
  typeSpeedMax: 115,

  deleteSpeedMin: 40,
  deleteSpeedMax: 90,
};

class Cursor {
  el: any;
  speed: number;
  faded: boolean;
  constructor(el: any, speed: number) {
    this.el = el;
    this.speed = speed;

    this.faded = false;

    this.initialAssignment();
    this.el.addEventListener('transitionend', this.logic.bind(this));

    this.fade = this.fade.bind(this);
    this.fadeIn = this.fadeIn.bind(this);
  }

  initialAssignment() {
    Object.assign(this.el.style, {
      opacity: '1',
      'transition-duration': '0.1s',
    });
  }

  fade() {
    this.el.style.opacity = '0';

    this.faded = true;
  }

  fadeIn() {
    this.el.style.opacity = '1';

    this.faded = false;
  }

  logic() {
    this.faded
      ? setTimeout(this.fadeIn, this.speed)
      : setTimeout(this.fade, this.speed);
  }

  start() {
    setTimeout(this.fade.bind(this), 0);
  }
}

class Typewriter {
  el: any;
  text: string;
  queue: any[];
  options: any;
  timestamp: any;
  running: any;
  cursorEl: any;
  cursor: any;
  textEl: any;

  constructor(el: any, options: Object) {
    this.el = el;
    this.text = '';
    this.queue = [];
    this.options = Object.assign({}, defaultOptions, options);

    this.createTextEl();
  }

  // USER API

  type(str: string) {
    this.queue.push({
      type: 'type',
      content: str,
    });

    return this;
  }

  strings(interval: any, ...arr: any[]) {
    arr.forEach((str, i) => {
      this.queue.push({
        type: 'type',
        content: str,
      });

      if (interval) {
        this.queue.push({
          type: 'pause',
          time: interval,
        });
      }

      if (i === arr.length - 1) return;

      this.queue.push({
        type: 'deleteChars',
        count: str.length,
      });
    });

    return this;
  }

  remove(num: number) {
    this.queue.push({
      type: 'deleteChars',
      count: num,
    });

    return this;
  }

  clear() {
    this.queue.push({
      type: 'clear',
    });

    return this;
  }

  clearText() {
    this.text = '';
    this.render();

    return this;
  }

  queueClearText() {
    this.queue.push({
      type: 'clearText',
    });

    return this;
  }

  clearQueue() {
    this.queue = [];
    this.text = '';
    this.render();

    return this;
  }

  rest(time: number) {
    this.queue.push({
      type: 'pause',
      time,
    });

    return this;
  }

  changeOps(options: Object) {
    this.queue.push({
      type: 'changeOps',
      options,
    });

    return this;
  }

  then(cb: Function) {
    this.queue.push({
      type: 'callback',
      cb,
    });

    return this;
  }

  removeCursor() {
    this.queue.push({
      type: 'deleteCursor',
    });

    return this;
  }

  addCursor() {
    this.queue.push({
      type: 'createCursor',
    });

    return this;
  }

  changeTypeColor(color: any) {
    this.queue.push({
      type: 'typeColor',
      color,
    });

    return this;
  }

  changeCursorColor(color: any) {
    this.queue.push({
      type: 'cursorColor',
      color,
    });

    return this;
  }

  changeTypeClass(className: string) {
    this.queue.push({
      type: 'typeClass',
      className,
    });

    return this;
  }

  changeCursorClass(className: string) {
    this.queue.push({
      type: 'cursorClass',
      className,
    });

    return this;
  }

  start() {
    if (this.running) return;

    if (!this.cursorEl) {
      this.createCursorEl();
    }

    this.running = true;
    this.deleteAll().then((_) => this.loop(0));
  }

  // ACTIONS (promises)

  add(content: any) {
    let count = 0;
    this.timestamp = Date.now();

    return new Promise((resolve, _) => {
      const _step = () => {
        if (count === content.length) return resolve(undefined);

        const newStamp = Date.now();
        const change = newStamp - this.timestamp;

        if (change >= this.getTypeSpeed()) {
          this.addChar(content[count]);
          this.timestamp = newStamp;
          count++;
        }
        requestAnimationFrame(_step);
      };

      requestAnimationFrame(_step);
    });
  }

  delete(count: any) {
    this.timestamp = Date.now();

    return new Promise((resolve, _) => {
      const _step = () => {
        if (count === 0) return resolve(undefined);

        const newStamp = Date.now();
        const change = newStamp - this.timestamp;

        if (change >= this.getDeleteSpeed()) {
          this.deleteChar();
          this.timestamp = newStamp;
          count--;
        }
        requestAnimationFrame(_step);
      };

      requestAnimationFrame(_step);
    });
  }

  deleteAll() {
    return this.delete(this.text.length);
  }

  pause(time: any) {
    return new Promise((resolve, _) => {
      setTimeout(resolve, time);
    });
  }

  callback(cb: any) {
    return new Promise((resolve, _) => {
      cb();
      resolve(undefined);
    });
  }

  deleteCursor() {
    return new Promise((resolve, _) => {
      this.removeCursorEl();
      resolve(undefined);
    });
  }

  createCursor() {
    return new Promise((resolve, _) => {
      this.createCursorEl();
      resolve(undefined);
    });
  }

  clearTextAction() {
    return new Promise((resolve, _) => {
      this.clearText();
      resolve(undefined);
    });
  }

  changeOpsAction(options: any) {
    return new Promise((resolve, _) => {
      this.options = Object.assign(this.options, options);
      resolve(undefined);
    });
  }

  typeColor(color: any) {
    return new Promise((resolve, _) => {
      this.textEl.style.color = color;
      resolve(undefined);
    });
  }

  cursorColor(color: any) {
    return new Promise((resolve, _) => {
      this.cursorEl.style.color = color;
      resolve(undefined);
    });
  }

  typeClass(className: any) {
    return new Promise((resolve, _) => {
      this.textEl.className = className;
      resolve(undefined);
    });
  }

  cursorClass(className: any) {
    return new Promise((resolve, _) => {
      this.cursorEl.className = className;
      resolve(undefined);
    });
  }

  // HELPERS

  deleteChar() {
    this.text = this.text.slice(0, -1);
    this.render();
  }

  addChar(char: any) {
    this.text += char;
    this.render();
  }

  getTypeSpeed() {
    const speed = this.options.typeSpeed;

    if (typeof speed === 'number') {
      return speed;
    }

    const max = this.options.typeSpeedMax;
    const min = this.options.typeSpeedMin;

    const random = Math.floor(Math.random() * (max - min));
    return random + min;
  }

  getDeleteSpeed() {
    const speed = this.options.deleteSpeed;

    if (typeof speed === 'number') {
      return speed;
    }

    const max = this.options.deleteSpeedMax;
    const min = this.options.deleteSpeedMin;

    const random = Math.floor(Math.random() * (max - min));
    return random + min;
  }

  step(idx: any) {
    const action = this.queue[idx];

    switch (action.type) {
      case 'type':
        return this.add(action.content);

      case 'deleteChars':
        return this.delete(action.count);

      case 'clear':
        return this.deleteAll();

      case 'pause':
        return this.pause(action.time);

      case 'callback':
        return this.callback(action.cb);

      case 'deleteCursor':
        return this.deleteCursor();

      case 'createCursor':
        return this.createCursor();

      case 'clearText':
        return this.clearTextAction();

      case 'changeOps':
        return this.changeOpsAction(action.options);

      case 'typeColor':
        return this.typeColor(action.color);

      case 'cursorColor':
        return this.cursorColor(action.color);

      case 'typeClass':
        return this.typeClass(action.className);

      case 'cursorClass':
        return this.cursorClass(action.className);
      default:
        return;
    }
  }

  loop(idx: any) {
    if (idx === this.queue.length) {
      this.running = false;

      if (this.options.loop) {
        this.start();
      }
      return;
    }

    this.step(idx)?.then((_) => {
      this.loop(idx + 1);
    });
  }

  createCursorEl() {
    if (typeof this.options.animateCursor === 'string') return;

    this.cursorEl = document.createElement('span');
    this.cursorEl.innerHTML = '|';

    this.cursorEl.style.color = this.options.cursorColor;

    this.cursorEl.classList.add(this.options.cursorClass);

    this.el.appendChild(this.cursorEl);

    if (this.options.animateCursor) {
      this.cursor = new Cursor(this.cursorEl, this.options.blinkSpeed);

      this.cursor.start();
    }
  }

  removeCursorEl() {
    this.el.removeChild(this.cursorEl);

    this.cursorEl = null;
  }

  createTextEl() {
    this.textEl = document.createElement('span');

    this.textEl.classList.add(this.options.typeClass);

    this.textEl.style.color = this.options.typeColor;

    this.el.appendChild(this.textEl);
  }

  render() {
    this.textEl.innerHTML = this.text;
  }
}

export default Typewriter;
