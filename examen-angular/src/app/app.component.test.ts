// to add form with control and submit button

// <form [formGroup]="voyage">
//     Description : <input formControlName="description">
//     <div *ngIf="voyage.get('description')!.invalid &&
//     voyage.get('description')!.touched">
//             Description required !
//     </div>
//     Depart : <input formControlName="depart">
//     <div *ngIf="voyage.get('depart')!.invalid &&
//     voyage.get('depart')!.touched">
//         Depart invalid !
//     </div>
//     Arrive : <input formControlName="arrive">
//     Nombre Places : <input formControlName="nb_place">
//     <input type="submit" value="Add voyage" [disabled]="voyage.invalid" (click)="add()">
// </form>


// -------------------

// At service level

// import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { VoyageService } from '../voyage.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-addvoyage',
//   templateUrl: './addvoyage.component.html',
//   styleUrls: ['./addvoyage.component.css'],
// })
// export class AddvoyageComponent {
//   constructor(private voyageService: VoyageService
//     , private router: Router) { }
//   voyage: FormGroup = new FormGroup({
//     description: new FormControl('', [Validators.required]),
//     depart: new FormControl('', [Validators.pattern(/^Vdepart.*/)]),
//     arrive: new FormControl(),
//     nb_place: new FormControl(),
//   });

//   add() {
//     this.voyage.value.nb_view = 0;
//     this.voyageService.addVoyage(this.voyage.value).subscribe({
//       next : () =>  this.router.navigate(['/list'])
//     });
//   }
// }

// -------------------

// Exemple of app component

// <a routerLink="/addvoyage" > Add Voyage </a>
// <a routerLink="/list">List Voyage</a>
// <router-outlet></router-outlet>

// -------------------


// This is the app-routing.module.ts file

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AddVoyageComponent } from './add-voyage/add-voyage.component';
// import { ListeVoyageComponent } from './liste-voyage/liste-voyage.component';

// const routes: Routes = [
//   { path: 'addvoyage', component: AddVoyageComponent },
//   { path: 'list', component: ListeVoyageComponent },
//   { path: '**', redirectTo: '/list' },
// ];
// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes)
// ],
// exports:[RouterModule]
// })
// export default class AppRoutingModule {}


// -------------------

// This example is the app.component.html file list

// <table>
//     <tr>
//         <th>ID</th>
//         <th>Description</th>
//         <th>Depart</th>
//         <th>Arrive</th>
//         <th>Places</th>
//         <th>Views</th>
//     </tr>
//     <tr *ngFor="let voyage of voyages">
//         <td>{{voyage.id}}</td>
//         <td>{{voyage.description}}</td>
//         <td>{{voyage.depart}}</td>
//         <td>{{voyage.arrive}}</td>
//         <td>{{voyage.nb_place}}</td>
//         <td>{{voyage.nb_view}}</td>
//         <td *ngIf="voyage.nb_place>0"><a (click)="reserver(voyage)">Reserver</a></td>
//         <td><a [routerLink]="['/details/',voyage.id]">Details</a></td>
//     </tr>
// </table>

// -------------------

// This ListvoyageComponent is the app.component.ts file list

// import { Component } from '@angular/core';
// import { Voyage } from '../voyage';
// import { VoyageService } from '../voyage.service';

// @Component({
//   selector: 'app-listvoyage',
//   templateUrl: './listvoyage.component.html',
//   styleUrls: ['./listvoyage.component.css']
// })
// export class ListvoyageComponent {

//   voyages: Voyage[] = [];
//   constructor(private voyageService: VoyageService) {
//     this.voyageService.getVoyages().subscribe({
//       next: (data) => this.voyages = data,
//       error : (e) => console.log(e)
//     })
//   }

//   reserver(v: Voyage) {
//     v.nb_place--;
//     this.voyageService.updateVoyage(v.id, v).subscribe({
//       next: () => {
//         let index = this.voyages.findIndex(e=>e.id == v.id)
//         this.voyages[index]=v
//       }
//     })
//   }

// }

// -------------------

// This is the voyage service

// import { Injectable } from '@angular/core';
// import { Voyage } from './voyage';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class VoyageService {

//   constructor(private http:HttpClient) { }

//   addVoyage(voyage: Voyage) {
//     return this.http.post('http://localhost:3000/voyage', voyage);
//   }

//   getVoyages() {
//     return this.http.get<Voyage[]>('http://localhost:3000/voyage');
//   }

//   updateVoyage(id: number, voyage: Voyage) {
//     return this.http.put('http://localhost:3000/voyage/'+id,voyage);
//   }

//   getVoyageById(id: number) {
//     return this.http.get<Voyage>('http://localhost:3000/voyage/' + id);
//   }
// }


