import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent {


newChat: string;
_messages: any;
userId: any;
username: any;
userQuote: string;

  constructor(private toastr: ToastrService, private authService: AuthService, private router:Router, private chatService: ChatService) {
    this.newChat = '';
    this.userId = window.localStorage.getItem('userId');
    this.username = window.localStorage.getItem('username');
    this.userQuote = '';
   }

logout() {
this.authService.logout();
this.router.navigate(['/login']);
}

addChat() {
  this.chatService.addChat(this.newChat).then(result => {
    // refresh the list
    this.ngOnInit();
    // clear the input field
    this.newChat = '';
  });
  }

  deleteChat(id:number) {
    this.chatService.deleteChat(id).then(result => {
      // refresh the list
      this.ngOnInit();
    });
    }

  quote() {
    this.chatService.getQuotesFromApi().then(result => {
      this.newChat = result.content;
      this.toastr.success('Enjoy and spread the wisdom...', 'Random epic quote added');
    })

  }


ngOnInit() {
  this.chatService.getChatsFromApi().then(result => {
    console.log(result);
    this._messages = result;
  })


}

}
