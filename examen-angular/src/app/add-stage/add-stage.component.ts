import { Component } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StageService } from '../stage.service';

@Component({
  selector: 'add-stage-form',
  templateUrl: './add-stage.component.html',
  styleUrls: ['./add-stage.component.css']
})
export class AddStageComponent {
  stage: FormGroup = new FormGroup({
    ref: new FormControl('', [Validators.required]),
    titre: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required,Validators.minLength(3)]),
    entreprise: new FormControl('', [Validators.required,Validators.pattern(/^[A-Z].*/)]),
    disponible: new FormControl(true),
    nbrInteresse:new FormControl(0, [Validators.required]),
  });
  
  stageId;

  constructor(private stageService: StageService, private activatedRouter: ActivatedRoute,private router: Router) {
    this.stageId = this.activatedRouter.snapshot.params["id"] || undefined
    if(this.stageId !== undefined) {
      this.stageService.getStageById(this.stageId).subscribe({
        next: (stage) => {
          this.stage.patchValue({
            title: stage.ref,
            titre: stage.titre,
            description: stage.description,
            entreprise: stage.entreprise,
            disponible: stage.disponible,
            nbrInteresse:stage.nbrInteresse
          });
        },
        error: () => {
          alert('An error occurred while fetching stage');
        }
      });
    }
  }
  save() {
    if(this.stageId !== undefined) {
      this.stageService.updateStage(this.stage.value).subscribe({
        next: () => {
          this.router.navigate(['/stages']);
        },
        error: () => {
          alert('An error occurred while updating stage');
        }
      });
    } else {
      this.stageService.addStage(this.stage.value).subscribe({
        next: () => {
          this.router.navigate(['/stages']);
        },
        error: () => {
          alert('An error occurred while adding stage');
        }
      });
    }
  }

  getButtonTitle():string {
    return this.stageId !== undefined ? 'Update' : 'Add';
  }
}
