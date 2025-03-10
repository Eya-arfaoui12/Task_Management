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

  getLists(): Observable<List[]> {
    return this.webReqService.get<List[]>('lists');
  }

  createList(title: string): Observable<List> {
    //we want to send a web request to create a list
    return this.webReqService.post<List>('lists', {title});
  }

  getTasks(listId: string): Observable<Task[]>{
    return this.webReqService.get<Task[]>(`lists/${listId}/tasks`);
  }
 
  createTask(title: string, description: string, listId: string): Observable<Task> {
    // Envoyer une requête avec title et description
    return this.webReqService.post<Task>(`lists/${listId}/tasks`, { title, description });
  }

  complete(task: Task) {
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }

}
