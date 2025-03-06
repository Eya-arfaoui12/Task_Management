import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-new-task',
  imports: [],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }
  listId!: string; 
  ngOnInit() {
      // Récupérer les paramètres d'URL pour obtenir l'ID de la liste sélectionnée
      this.route.params.subscribe((params: Params) => {
        this.listId = params['listId'];
        console.log('List ID récupéré:',this.listId);
        })
      };
      createTask(title: string) {
        console.log('List ID:', this.listId);  // Vérifiez que l'ID est bien récupéré ici
        this.taskService.createTask(title, this.listId).subscribe(
          (newTask: Task) => {
            console.log('Task created:', newTask);  // Vérifiez que la tâche est correctement créée
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          (error) => {
            console.error('Error while creating task:', error);  // Log d'erreur
          }
        );
      }
      



}
