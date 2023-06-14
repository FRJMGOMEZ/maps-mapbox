import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { PlacesComponent } from './pages/places/places.component';

const routes: Routes = [
  {
    path: '',
    component: MapsLayoutComponent,
    children: [
      { path: 'fullscreen', loadComponent: () => import('./pages/full-screen-page/full-screen-page.component').then(m => m.FullScreenPageComponent) },
      { path: 'places', component: PlacesComponent },
      { path: '**', pathMatch: 'prefix', redirectTo: 'fullscreen' } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
