import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FundaFooterComponent } from './funda-footer/funda-footer.component';
import { FundaNavbarComponent } from './funda-navbar/funda-navbar.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CrmSectionComponent } from './crm-section/crm-section.component';
import { FoundersSectionComponent } from './founders-section/founders-section.component';
import { AiSectionComponent } from './ai-section/ai-section.component';
import { WhyFundaSectionComponent } from './why-funda-section/why-funda-section.component';
import { ReviewsSectionComponent } from './reviews-section/reviews-section.component';
import { ReviewComponent } from './reviews-section/review/review.component';
import { SwiperModule } from 'swiper/angular';
import { PricingSectionComponent } from './pricing-section/pricing-section.component';
import { GetApprovedSectionComponent } from './get-approved-section/get-approved-section.component';
import { WeCanFundSectionComponent } from './we-can-fund-section/we-can-fund-section.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { playerFactory } from '../app.module';
import { LottieModule } from 'ngx-lottie';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [
    HomeComponent,
    FundaFooterComponent,
    FundaNavbarComponent,
    CrmSectionComponent,
    FoundersSectionComponent,
    AiSectionComponent,
    WhyFundaSectionComponent,
    ReviewsSectionComponent,
    ReviewComponent,
    PricingSectionComponent,
    GetApprovedSectionComponent,
    WeCanFundSectionComponent,
  ],
  imports: [
    HomeRoutingModule,
    AuthModule,
    CollapseModule.forRoot(),
    SwiperModule,
    CommonModule,
    SharedModule,
    LottieModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
