import { Component, ViewChild } from '@angular/core';
import SwiperCore, { Autoplay } from 'swiper/core';

SwiperCore.use([Autoplay]);
@Component({
  selector: 'reviews-section',
  templateUrl: './reviews-section.component.html',
  styleUrls: ['./reviews-section.component.scss'],
})
export class ReviewsSectionComponent {
  @ViewChild('swiper') swiper: any;

  onNextClick = () => {
    this.swiper.swiperRef.slideNext();
  };

  onPrevClick = () => {
    this.swiper.swiperRef.slidePrev();
  };
}
