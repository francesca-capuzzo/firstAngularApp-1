import { Component, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { Api2Service } from 'src/app/services/api2.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit{

  public searchString = "";
  
  public tagArray: string[] = [];

  public stringArray : string[] = [];

  constructor(private api2S: Api2Service) { }

  ngOnInit(){
    this.api2S.stringArray$.subscribe(tags => this.tagArray = tags);
  }

  findTasks(){
    this.api2S.getActiveTasks(this.searchString);
    this.api2S.getDoneTasks(this.searchString);
  }

  findTaskByTag(){
    this.api2S.getActiveByTag(this.stringArray);
    this.api2S.getDoneByTag(this.stringArray);
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
