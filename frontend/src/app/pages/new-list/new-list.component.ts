import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // ✅ Import du RouterModule
import { TaskService } from '../../task.service';
import { CommonModule } from '@angular/common';
import { List } from '../../models/list.model';

@Component({
  selector: 'app-new-list',
  standalone: true, // ✅ Assure-toi que c'est un composant standalone
  imports: [RouterModule, CommonModule], // ✅ Ajoute RouterModule ici
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.scss'
})
export class NewListComponent {

  constructor(private taskService: TaskService, private router: Router) { }

  createNewList(title: string) {
    this.taskService.createList(title).subscribe((list: List) => {
      console.log(list);
      if (list && list._id) {
        this.router.navigate(['/lists', list._id]); 
      } else {
        console.error('Erreur : list._id est undefined');
      }
    });
  }
}
