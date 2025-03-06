import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Observable } from 'rxjs';
import { List } from './models/list.model';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  getLists() {
    return this.webReqService.get('lists');
  }

  createList(title: string): Observable<List> {
    //we want to send a web request to create a list
    return this.webReqService.post<List>('lists', {title});
  }

  getTasks(listId: string): Observable<any[]>{
    return this.webReqService.get(`lists/${listId}/tasks`);
  }
 
  createTask(title: string, listId: string): Observable<Task> {
    //we want to send a web request to create a task
    return this.webReqService.post<Task>(`lists/${listId}/tasks`, {title});
  }
}
