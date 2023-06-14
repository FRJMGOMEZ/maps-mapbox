import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import * as mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiZnJqbWdvbWV6IiwiYSI6ImNrYXBpbm9mYTBhZGkydW1zZ2t3N2xqY2wifQ.yr0ONX9d0KQybk4DLpiV0Q';


@NgModule({
  declarations: [
    MapsLayoutComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    MiniMapComponent,
    SideMenuComponent
  ]
})
export class MapsModule { }
