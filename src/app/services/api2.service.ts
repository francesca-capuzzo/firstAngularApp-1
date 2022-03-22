import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, first, map, Observable, of, Subscription } from 'rxjs';
import { Task } from "../model/task";

@Injectable({
  providedIn: 'root'
})
export class Api2Service {

  private readonly API_URL = 'https://6229de55be12fc4538aa6c8e.mockapi.io/task';

  public activeTasks$ = new BehaviorSubject<Task[]>([]);
  public doneTasks$ = new BehaviorSubject<Task[]>([]);
  public stringArray$ = new BehaviorSubject<string[]>([]);

  public activeSub?: Subscription;
  public doneSub?: Subscription;

  constructor(private http: HttpClient) {
    this.getActiveTasks();
    this.getDoneTasks();
    this.generateTags();
  }

  generateTags(){
    const tags = ["Casa", "Lavoro", "Svago", "Spesa", "Altro"];
    this.stringArray$.next(tags);
  }

  getActiveTasks(filter?: string){
    if(this.activeSub){
      this.activeSub.unsubscribe();
    }

    let filterParam = '?';
    if (filter) {
      filterParam += 'search='+ filter
    }
    this.activeSub = this.http.get<Task[]>(this.API_URL + filterParam).pipe(
      map(tasks => tasks.filter(t => t.doneDate === null)),
      map(tasks => tasks.map(t => this.parseTask(t)))
    ).subscribe(tasks => this.activeTasks$.next(tasks))
  }

  removeActiveTask(task: Task){
    let activeArray = this.activeTasks$.value;
    activeArray = activeArray.filter(t => t.id !== task.id);
    this.activeTasks$.next(activeArray);
  }

  addActiveTask(task: Task){
    let activeArray = this.activeTasks$.value;
    activeArray.push(task);
    this.activeTasks$.next(activeArray);
  }

  getDoneTasks(filter?: string){
    if(this.doneSub){
      this.doneSub.unsubscribe();
    }
    let filterParam = '';
    if (filter) {
      filterParam = '?search='+filter
    }
    this.doneSub = this.http.get<Task[]>(this.API_URL + filterParam).pipe(
      map(tasks => tasks.filter(t => t.doneDate !== null)),
      map(tasks => tasks.map(t => this.parseTask(t)))
    ).subscribe(tasks => this.doneTasks$.next(tasks))
  }

  removeDoneTask(task: Task){
    let doneArray = this.doneTasks$.value;
    doneArray = doneArray.filter(t => t.id !== task.id);
    this.doneTasks$.next(doneArray);
  }

  addDoneTask(task: Task){
    let doneArray = this.doneTasks$.value;
    doneArray.push(task);
    this.doneTasks$.next(doneArray);
  }

  getSingleTask(taskId:string): Observable<Task | undefined>{
    return this.http.get<any>(this.API_URL + "/" + taskId).pipe(
      map(taskObj => this.parseTask(taskObj))
    );
  }


  createTask(task: Task): Observable<Task>{
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})}
    return this.http.post<Task>(this.API_URL, task.toDatabaseModel(), httpOptions).pipe(
      map(taskObj => this.parseTask(taskObj))
    );
  }

  deleteTask(taskId: string): Observable<any>{
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})}
    return this.http.delete<any>(this.API_URL + "/" + taskId, httpOptions);
  }


  completeTask(task: Task): Observable<Task>{
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})}
    task.doneDate = new Date();
    return this.http.put<Task>(this.API_URL + "/" + task.id, task.toDatabaseModel() ,httpOptions).pipe(
      map(taskObj => this.parseTask(taskObj))
    );;
  }

  parseTask(obj: any): Task {
    const task = new Task(obj.id, obj.name, obj.priority, obj.creationDate);
    if (obj.doneDate) {
      task.doneDate = new Date(obj.doneDate);
    }
    if (obj.tags) {
      task.tags = obj.tags;
    }
    return task;
  }



  getActiveByTag(tagsArr: string[]){
    this.activeTasks$.pipe(
      map(arr => this.searchByTag(arr, tagsArr))
    ).subscribe(arr => this.activeTasks$.next(arr));
  }

  getDoneByTag(tagsArr: string[]){
    this.doneTasks$.pipe(
      map(arr => this.searchByTag(arr, tagsArr))
    ).subscribe(arr => this.doneTasks$.next(arr));
  }

  searchByTag(arr: Task[], tagsArr: string[]): Task[]{
    const resultArr = [];
    for (const tag of tagsArr) {
      for (const tag2 of arr) {
        if (tag2.tags) {
          if(tag2.tags?.indexOf(tag) > -1){
            resultArr.push(tag2)
          } 
        }
      }
    }
    return resultArr;
  }
}
