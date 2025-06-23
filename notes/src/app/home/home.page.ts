import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NoteService, Note } from '../service/note.service';
import { ModalController } from '@ionic/angular';
import { NoteModalComponent } from '../note-modal/note-modal.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {
  searchText = '';
  isGrid = true;
  selectedItem: string = 'notes';
  fabExpanded = false;

  constructor(private menu: MenuController, private noteService: NoteService, private modalCtrl: ModalController) {}

  openMenu() {
    this.menu.open();
  }

  onSearchFocus() {
    
  }

  onSearchInput() {
    
  }

  onGridClick() {
    this.isGrid = !this.isGrid;
  }

  onAvatarClick() {

  }

  selectItem(item:string){
    this.selectedItem = item;
  }
  toggleFab() {
  this.fabExpanded = !this.fabExpanded;
}

async createNote(type: string) {
  this.fabExpanded = false;

  const modal = await this.modalCtrl.create({
    component: NoteModalComponent,
    componentProps: { type },
  });

  modal.onDidDismiss().then(async (res) => {
    if (res.data) {
      const newNote: Note = {
        title: res.data.title,
        content: res.data.content,
        type: res.data.type,
        createdAt: res.data.createdAt,
      };

  try {
    const result = await this.noteService.addNote(newNote);
    console.log('Note created with ID:', result.id);
    
  } catch (error) {
    console.error('Error adding note:', error);
  }
}
});
await modal.present();
}}