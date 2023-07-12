import { Component } from '@angular/core';
// import { Router, } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-settings-navbar',
  templateUrl: './settings-navbar.component.html',
  styleUrls: ['./settings-navbar.component.css']
})
export class SettingsNavbarComponent {
  activeLink: string;
 constructor(private router:Router){

 }
 ngOnInit() {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.activeLink = event.urlAfterRedirects;
    }
  });
}

  
}
