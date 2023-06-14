import { Component } from '@angular/core';
import { Place } from './place.model';
import { places } from './places.data';
import { CommonModule } from '@angular/common';
import { MiniMapComponent } from '../../components/mini-map/mini-map.component';

@Component({
  standalone:true,
  imports:[CommonModule, MiniMapComponent],
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent {

  places:Place[] = places;
  constructor() { }

}
