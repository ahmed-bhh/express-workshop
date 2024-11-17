import { Component } from '@angular/core';
import { Stage } from '../model/Stage';
import { StageService } from '../stage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent {

  stages: Stage[] = [];
  stagesFiltred: Stage[] = [];

  constructor(private stageService: StageService,private router: Router) {
    this.stageService.getStages().subscribe({
      next: (stages) => {
        this.stages = stages;
        this.stagesFiltred = stages;

      },
      error: () => {
        alert('An error occurred while fetching stages');
      }
    });
  }

  deleteStage(id: string) {
    this.stageService.deleteStage(id).subscribe({
      next: () => {
        this.stagesFiltred = this.stagesFiltred.filter(stage => stage.id !== id);
      },
      error: () => {
        alert('An error occurred while deleting stage');
      }
    });
  }

  editStage(id: string) {
    this.router.navigate([`stage/edit/${id}`]);
  }

  onSearchTextChange(event: Event) {
    this.stagesFiltred = [];
    this.stages.forEach((element) => {
      if (element.description.includes((event.target as HTMLInputElement).value)) {
        this.stagesFiltred.push(element);
      }
    });
  }

  incrementNbreInteresse(stage: Stage) {
    stage.nbrInteresse++;
    this.stageService.updateStage(stage).subscribe({
      next: () => this.stagesFiltred = this.stagesFiltred.map(v => v.id === stage.id ? stage : v),
      error: () => alert('Erreur lors de la mise à jour du stage')
    });
  }

}
