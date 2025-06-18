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
  selectedItem: string = 'notes';

  constructor(private menu: MenuController) {}

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
}
