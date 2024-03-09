import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  
  activeLink: string = ''; 
  
  
  navigateTo(link: string) {
    this.activeLink = link;
  }
  
  

  
}
