import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
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
   

   getNotes(): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>;
  }
}
