import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create/create-account.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ScheduleBookingComponent } from './create/schedule-booking/schedule-booking.component';
import { ConfirmBookingComponent } from './create/confirmed-booking/confirm-booking.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'booking',
    component: ScheduleBookingComponent,
  },
  {
    path: 'confirmed',
    component: ConfirmBookingComponent,
  },
  { path: 'create', component: CreateAccountComponent },
  {
    path: 'reset-password/request',
    component: ResetPasswordComponent,
  },
  { path: 'reset-password/update', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
