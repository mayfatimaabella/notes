import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Note {
  id?: string;
  type:string;
  title: string;
  content: string;
  createdAt: Date;
} 

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private firestore: Firestore) {}

    addNote(note: Note) {
      const notesRef = collection(this.firestore, 'notes');
      return addDoc(notesRef, note);
    }
   
    updateNote(note: Note) {
      if (!note.id) throw new Error('Note id is required');
      const noteRef = doc(this.firestore, 'notes', note.id);
      return updateDoc(noteRef, { ...note });
    }

    deleteNote(noteId: string) {
      const noteRef = doc(this.firestore, 'notes', noteId);
      return deleteDoc(noteRef);
    }

   getNotes(): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>;
  }
}
