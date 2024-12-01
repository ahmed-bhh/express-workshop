import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StageService} from "../stage.service";
import {Stage} from "../model/Stage";

@Component({
  selector: 'app-detailstage',
  templateUrl: './detailstage.component.html',
  styleUrls: ['./detailstage.component.css']
})
export class DetailstageComponent implements OnInit {
  id!:string
  constructor(
    private activatedRoute : ActivatedRoute,
    private stageService: StageService
  ) {}
  Stage:Stage[]=[]

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params["id"];
    this.stageService.getStageById(this.id)
      .subscribe((data)=>{
        this.Stage.push( data as any)
        console.log(this.Stage);
      })
  }

}
