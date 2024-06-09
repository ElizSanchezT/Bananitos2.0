import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule  } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,NavbarComponent,FooterComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showNavBarAndFooter = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavBarAndFooter = event.urlAfterRedirects !== '/login';
      }
    });
  }

  onActivate(event: any): void {
    if (typeof window !== 'undefined') {
      window.scroll(0, 0);
    }
  }
   
}
