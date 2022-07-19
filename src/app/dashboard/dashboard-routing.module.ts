import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MainContentComponent } from './main-content/main-content.component';

const routes: Routes = [
  {
    path: 'get-started',
    component: MainContentComponent,
  },
  {
    path: 'wallet',
    component: MainContentComponent,
  },
  {
    path: 'projects',
    component: MainContentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
