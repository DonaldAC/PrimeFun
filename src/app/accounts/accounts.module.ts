import { NgModule } from '@angular/core';
import { AccountsRoutingModule } from './accounts-routing.module';
import { CreateAccountComponent } from './create/create-account.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateFormComponent } from './create/create-form/create-form.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestComponent } from './reset-password/request/request.component';
import { ReviewComponent } from './review/review.component';
import { UpdateComponent } from './reset-password/update/update.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { InfoFormComponent } from './create/info-form/info-form.component';
import { AccountsService } from './services/accounts.service';
import { AuthModule } from '../auth/auth.module';
import { CallBookingComponent } from './create/call-booking/call-booking.component';
import { ProgressLoaderComponent } from 'src/app/shared/components/progress-loader/progress-loader.component';
import { NavHeaderComponent } from '../shared/components/header/nav-header.component';
import { ScheduleBookingComponent } from './create/schedule-booking/schedule-booking.component';
import {CalendelyComponent} from "../shared/components/calendley/calendely.component";
import { ConfirmBookingComponent } from './create/confirmed-booking/confirm-booking.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [
    CreateAccountComponent,
    LoginComponent,
    LoginFormComponent,
    CreateFormComponent,
    ResetPasswordComponent,
    RequestComponent,
    ReviewComponent,
    UpdateComponent,
    InfoFormComponent,
    CallBookingComponent,
    ProgressLoaderComponent,
    NavHeaderComponent,
    CalendelyComponent,
    ScheduleBookingComponent,
    ConfirmBookingComponent,
    UserDetailsComponent
  ],
  imports: [
    AccountsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedModule,
    AuthModule,
  ],
  providers: [AccountsService],
})
export class AccountsModule {}
