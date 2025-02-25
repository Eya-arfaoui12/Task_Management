import { Component } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { TaskService } from '../../task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-view',
  standalone: true, // Assure-toi que c'est un composant standalone
  imports: [RouterModule, CommonModule], // Assurez-vous que RouterModule est inclus ici
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent {

  lists: any[] = [];
  tasks: any[] = [];
  selectedListId: string | null = null;

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Récupérer les paramètres d'URL pour obtenir l'ID de la liste sélectionnée
    this.route.params.subscribe((params: Params) => {
      this.selectedListId = params['listId'];  // Récupère l'ID de la liste sélectionnée dans l'URL
      console.log('List ID from params:', this.selectedListId);
      
      // Si un 'listId' est présent dans l'URL, on récupère les tâches pour cette liste
      if (this.selectedListId) {
        this.taskService.getTasks(this.selectedListId).subscribe({
          next: (tasks: any[]) => {
            this.tasks = tasks;  // Charge les tâches pour la liste sélectionnée
          },
          error: (err) => {
            console.error('Error fetching tasks:', err);
          }
        });
      }
    });

    // Récupérer la liste des listes disponibles
    this.taskService.getLists().subscribe({
      next: (lists: any) => {  
        this.lists = lists;  // Charger toutes les listes
      },
      error: (err) => {  
        console.error('Error fetching lists:', err);
      }
    });
  }

  // Fonction pour appliquer un style 'selected' à la liste active
  isSelected(listId: string): boolean {
    return this.selectedListId === listId;
  }
}
