import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {
  listId!: string; 

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Récupérer les paramètres d'URL pour obtenir l'ID de la liste sélectionnée
    this.route.params.subscribe((params: Params) => {
      this.listId = params['listId'];
      console.log('List ID récupéré:', this.listId);
    });
  }

  createTask(title: string, description: string) {
    console.log('List ID:', this.listId);

    if (!title.trim()) {
      alert("Task title cannot be empty.");
      return;
    }

    this.taskService.createTask(title, description, this.listId).subscribe(
      (newTask: Task) => {
        console.log('Task created:', newTask);
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      (error) => {
        console.error('Error while creating task:', error);
      }
    );
}
}
