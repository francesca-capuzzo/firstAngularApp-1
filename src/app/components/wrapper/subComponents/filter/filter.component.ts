import { Component, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { Tag } from 'src/app/model/tags';
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

  public selectedTags: Tag[] = [];

  // eslint-disable-next-line no-unused-vars
  constructor(private api2S: Api2Service) { }

  ngOnInit(){
    this.api2S.stringArray$.subscribe(tags => this.tagArray = tags);
  }

  findTasks(){
    this.api2S.getActiveTasks(this.searchString);
    this.api2S.getDoneTasks(this.searchString);
  }

/////////////////////////////////////// CLASSE INIZIO ///////////////////////////////////////////////////////////////////////////

  findTasksWithTags(){
    //let tagString;
    // if (this.selectedTags.length > 0) {
    //   tagString = this.selectedTags.map(tag => tag.name)
    // }
    this.api2S.getActiveTasksWithTags(this.searchString, this.stringArray);
    this.api2S.getDoneTasksWithTags(this.searchString, this.stringArray);
  }


  selectTag(tag: Tag){
      if (!tag.isSelected) {
        tag.isSelected = false;
        const indexToRemove = this.selectedTags.indexOf(tag);
        if (indexToRemove !== -1) {
          this.selectedTags.splice(indexToRemove, 1);
        }
      } else{
        tag.isSelected = true;
        this.selectedTags.push(tag);
      }
      this.findTasksWithTags();
  }


//////////////////////////////////////// CLASSE FINE //////////////////////////////////////////////////////////////////////////

  // findTaskByTag(){
  //   this.api2S.getActiveByTag(this.stringArray);
  //   this.api2S.getDoneByTag(this.stringArray);
  // }

  selection(value: MatChip){
    if (value.selected === true) {
      this.stringArray = this.stringArray.filter(t => t !== value.value);
      value.selected = false;
    } else{
      value.selected = true;
      this.stringArray.push(value.value)
    }
    this.findTasksWithTags();
  }

  
}
