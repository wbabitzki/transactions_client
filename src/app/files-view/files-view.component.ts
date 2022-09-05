import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files-view',
  templateUrl: './files-view.component.html',
  styleUrls: ['./files-view.component.css']
})
export class FilesViewComponent {

  onFileSelected(event: Event) {
    console.log((event.target as HTMLInputElement).files?.item(0))
  }
}
