import { Component, OnInit } from '@angular/core';
import * as smoothscroll from 'smoothscroll-polyfill';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    smoothscroll.polyfill();
  }
  title = 'funda';
}
