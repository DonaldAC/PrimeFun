import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent {
  isCollapsed: boolean = true;
  isSidebarCollapsed: boolean = true;

  sidebarCollapse = () => {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  };
}
