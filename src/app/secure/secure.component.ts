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
  profile: any;
  _emoticons: any;
  showEmoticons: boolean;

  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router, private chatService: ChatService) {
    this.newChat = '';
    this.userId = window.localStorage.getItem('userId');
    this.username = window.localStorage.getItem('username');
    this.profile = window.localStorage.getItem('profile') ? window.localStorage.getItem('profile') : 'assets/219988.png';
    this.userQuote = '';
    this.showEmoticons = false;
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

  deleteChat(id: number) {
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

  likeChat(id: any) {
    this.chatService.likeChat(id).then(result => {
      // refresh the list
      this.ngOnInit();
    });
    }

    addEmoticon(eID: any, cID: any) {
      let postEmoticon = {
        chat_id : cID,
        user_id : this.userId,
        emoticon_id : eID
      }
      console.log(postEmoticon);
      this.chatService.postEmoticonToApi(postEmoticon).then((result: any) => {
        // refresh the list
        this.ngOnInit();
      });
  }


  ngOnInit() {
    this.chatService.getChatsFromApi().then(result => {
      this._messages = result;
    });
    this.chatService.getEmoticonsFromApi().then(result => {
      this._emoticons = result;
    });
  }

}
