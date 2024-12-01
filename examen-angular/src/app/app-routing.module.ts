import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StagesComponent } from './stages/stages.component';
import { AddStageComponent } from './add-stage/add-stage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {DetailstageComponent} from "./detailstage/detailstage.component";

const routes: Routes = [
  { path: 'stages', component:  StagesComponent},
  { path: 'stage/add', component: AddStageComponent },
  { path: 'stage/edit/:id', component: AddStageComponent },
  {path:"showstage/:id",component:DetailstageComponent},
  { path: '', redirectTo: '/stages', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
],
exports:[RouterModule]
})
export default class AppRoutingModule {}
