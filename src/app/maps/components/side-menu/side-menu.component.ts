import { Component, Input } from '@angular/core';
import { MenuItem } from './menu-item.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone:true,
  imports:[CommonModule, RouterModule],
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent  {
  @Input() menuItems:MenuItem[] = []

  constructor() { }
}
