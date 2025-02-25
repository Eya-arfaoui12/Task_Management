import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ Import du RouterModule
import { TaskService } from '../../task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-list',
  standalone: true, // ✅ Assure-toi que c'est un composant standalone
  imports: [RouterModule, CommonModule], // ✅ Ajoute RouterModule ici
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.scss'
})
export class NewListComponent {

  constructor(private taskService: TaskService) { }

  createNewList(title: string) {
    this.taskService.createList(title).subscribe((response: any) => {
      console.log(response);
      // Now we navigate to /lists/response._id
    });
  }
}
