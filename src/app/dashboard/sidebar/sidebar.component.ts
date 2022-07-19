import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isSidebarCollapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
