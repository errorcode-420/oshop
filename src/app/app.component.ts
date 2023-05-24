import { Component, ElementRef, HostListener } from '@angular/core';
import { AuthService } from './shared/services/authentication/auth.service';
import { Router } from '@angular/router';
import { UserService } from './shared/services/data/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: any;

  
  constructor
  (
    private userService: UserService, 
    private auth: AuthService, 
    private router: Router,
    private elementRef: ElementRef
  ) 
  { 
    auth.user$.subscribe(user => {
      if(user){
        userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        if(returnUrl) router.navigateByUrl(returnUrl);
      }
    });
  }

  closeMenu() {
    const navbarContent = this.elementRef.nativeElement.querySelector('#navbarContent');
    if (navbarContent && navbarContent.classList.contains('show')) {
      navbarContent.classList.remove('show');
    }
  }
}
