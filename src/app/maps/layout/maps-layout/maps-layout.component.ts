import { Component } from '@angular/core';
import { MenuItem } from '../../components/side-menu/menu-item.interface';

@Component({
  templateUrl: './maps-layout.component.html',
  styleUrls: ['./maps-layout.component.scss']
})
export class MapsLayoutComponent {

  constructor() { }
  menuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'Fullscreen' },
    { route: '/maps/places', name: 'Places' }]

}
