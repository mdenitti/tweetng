import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent {

  constructor(private authService: AuthService, private router:Router) { }

logout() {
this.authService.logout();
this.router.navigate(['/login']);
}

}
