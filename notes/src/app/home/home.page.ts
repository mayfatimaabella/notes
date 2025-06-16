import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {
  searchText = '';
  isGrid = true;

  constructor(private menu: MenuController) {}

  openMenu() {
    this.menu.open();
  }

  onSearchFocus() {
    
  }

  onSearchInput() {
    console.log('Search text:', this.searchText);
  }

  onGridClick() {
    this.isGrid = !this.isGrid;
  }

  onAvatarClick() {

  }
}
