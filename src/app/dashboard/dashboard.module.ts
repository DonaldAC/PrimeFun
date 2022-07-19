import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { GetStartedComponent } from './main-content/get-started/get-started.component';
import { SharedModule } from '../shared/shared.module';
import { BusinessInfoFormComponent } from './main-content/get-started/business-info-form/business-info-form.component';
import { IntroComponent } from './main-content/get-started/intro/intro.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifyIdentityComponent } from './main-content/get-started/verify-identity/verify-identity.component';
import { ProjectBriefingComponent } from './main-content/get-started/project-briefing/project-briefing.component';
import { ChatModule } from '../chat/chat.module';
import { RequestFundingComponent } from './main-content/get-started/request-funding/request-funding.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    MainContentComponent,
    GetStartedComponent,
    BusinessInfoFormComponent,
    IntroComponent,
    VerifyIdentityComponent,
    ProjectBriefingComponent,
    RequestFundingComponent,   
  ],
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ChatModule,
  ],
})
export class DashboardModule {}
