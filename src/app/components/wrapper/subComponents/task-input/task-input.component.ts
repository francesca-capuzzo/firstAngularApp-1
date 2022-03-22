import { Component, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { Task } from 'src/app/model/task';
import { ApiService } from 'src/app/services/api.service';
import { Api2Service } from 'src/app/services/api2.service';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss']
})

export class TaskInputComponent implements OnInit {

  // public tagArray: string[] = ["Casa", "Lavoro", "Spesa", "Svago", "Altro"];

  public tagArray: string[] = [];

  public stringArray : string[] = [];

  public taskModel = {name: "", priority: 0}

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
}
