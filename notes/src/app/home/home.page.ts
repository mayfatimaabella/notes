import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NoteService, Note } from '../service/note.service';
import { ModalController } from '@ionic/angular';
import { NoteModalComponent } from '../note-modal/note-modal.component';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

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
  popoverOpen = false;
  notes: Note[] = [];

  constructor(private menu: MenuController, private noteService: NoteService, private modalCtrl: ModalController, private authService: AuthService, private router: Router) {
    this.loadNotes();
  }

  loadNotes() {
    this.noteService.getNotes().subscribe((notes) => {
      this.notes = notes;
    });
  }

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
}

async openEditNoteModal(note: Note) {
  const modal = await this.modalCtrl.create({
    component: NoteModalComponent,
    componentProps: { ...note },
  });

  modal.onDidDismiss().then(async (res) => {
    if (res.data && res.data.delete) {
      // Delete note
      try {
        await this.noteService.deleteNote(note.id!);
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    } else if (res.data) {
      // Update note
      const updatedNote: Note = {
        ...note,
        title: res.data.title,
        content: res.data.content,
        type: res.data.type,
        createdAt: res.data.createdAt,
      };
      try {
        await this.noteService.updateNote(updatedNote);
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }
  });
  await modal.present();
}

async logout() {
  await this.authService.logout();
  this.router.navigate(['/login']);
}
}