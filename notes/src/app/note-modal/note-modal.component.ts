import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.scss'],
})
export class NoteModalComponent  implements OnInit {

  @Input() type!: string;

  title: string = '';
  content: string = '';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  save() {
    if (!this.title.trim() || !this.content.trim()) {
      return;
    }
    this.modalCtrl.dismiss({
      title: this.title,
      content: this.content,
      type: this.type,
      createdAt: new Date(),
    });
  }

  cancel(){
    this.modalCtrl.dismiss();

  }
}
