import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { WrapperComponent } from '../wrapper.component';
import { DoneListComponent } from '../subComponents/done-list/done-list.component';
import { FilterComponent } from '../subComponents/filter/filter.component';
import { StatisticsComponent } from '../subComponents/statistics/statistics.component';
import { TaskInputComponent } from '../subComponents/task-input/task-input.component';
import { TaskListElementComponent } from '../subComponents/task-list-element/task-list-element.component';
import { ToDoListComponent } from '../subComponents/to-do-list/to-do-list.component';
import { MatChipsModule } from '@angular/material/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FooterModule } from '../../footer/module/footer.module';






@NgModule({
  declarations: [
    WrapperComponent,
    ToDoListComponent,
    DoneListComponent,
    TaskInputComponent,
    FilterComponent,
    StatisticsComponent,
    TaskListElementComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    MatChipsModule,
    BrowserAnimationsModule,
    FormsModule,
    FooterModule
   
  ],
  exports: [
    WrapperComponent,
    ToDoListComponent,
    DoneListComponent,
    TaskInputComponent,
    FilterComponent,
    StatisticsComponent,
    TaskListElementComponent,
  ]
})


export class WrapperModule { }
