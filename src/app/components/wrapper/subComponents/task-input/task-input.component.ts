import { Component, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { Tag } from 'src/app/model/tags';
import { Task } from 'src/app/model/task';
import { Api2Service } from 'src/app/services/api2.service';


@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss']
})

export class TaskInputComponent implements OnInit {

  // public tagArray: string[] = ["Casa", "Lavoro", "Spesa", "Svago", "Altro"];

  public tags: Tag[] = [{name: "scuola", isSelected: false},
                        {name: "lavoro", isSelected: false},
                        {name: "spesa", isSelected: false},
                      ]

  public selectedTags: Tag[] = [];

  public tagArray: string[] = [];

  public stringArray : string[] = [];

  public taskModel = {name: "", priority: 0}

  // eslint-disable-next-line no-unused-vars
  constructor(private api2S: Api2Service) { }

  ngOnInit(){
    this.api2S.stringArray$.subscribe(tags => this.tagArray = tags);
  }

  saveTask(){
    const newTask = new Task('', this.taskModel.name, this.taskModel.priority);
    newTask.tags = this.stringArray;
    this.api2S.createTask(newTask).subscribe(b => {
      if(!b){
        prompt("errore nel backend");
      } else {
        this.api2S.addActiveTask(b)
      }
    })
  }

  selection(value: MatChip){
    if (value.selected === true) {
      this.stringArray = this.stringArray.filter(t => t !== value.value);
      value.selected = false;
    } else{
      value.selected = true;
      this.stringArray.push(value.value)
    }
  }


  ///////////////////////////////////////// CLASSE INIZIO ///////////////////////////////////////////////////////////////////////////
  selectTag(tag: Tag){
    if (!tag.isSelected) {
      tag.isSelected = false;
      const indexToRemove = this.selectedTags.indexOf(tag);
      if (indexToRemove !== -1) {
        this.selectedTags.splice(indexToRemove, 1);
      }
    } else{
      tag.isSelected = true;
      this.selectedTags.push(tag)
    }
  }


  ////////////////////////////////////////////// CLASSE FINE //////////////////////////////////////////////////////////////////////
}


