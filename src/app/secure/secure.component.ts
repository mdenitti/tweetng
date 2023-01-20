import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent {


newMessage: string;
_messages: any;

  constructor(private authService: AuthService, private router:Router, private chatService: ChatService) {
    this.newMessage = '';
   }

logout() {
this.authService.logout();
this.router.navigate(['/login']);
}

addMessage() {
 // this.chatService.addMessage(this.newMessage);
  }

ngOnInit() {
  this.chatService.getChatsFromApi().then(result => {
    console.log(result);
    this._messages = result;
  })
}

}
