import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/authentication/auth.service';
import { Router } from '@angular/router';
import { fade } from '../../../shared/services/animation.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fade]
})
export class LoginComponent {

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    window.scrollTo(0, 0);
  } 
  
  login() {
    this.auth.login();
  }

  toProducts() {
    this.router.navigateByUrl('');
  }

}
