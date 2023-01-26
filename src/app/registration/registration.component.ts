import { Component } from '@angular/core';
import { ChatService } from '../chat.service';
import * as filestack from 'filestack-js';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  name: string;
  password: string;
  email: string;
  profile: string;

  
  async uploadFile(event: any) {
    const file = event.target.files[0];
    const client = filestack.init('ADRQeGzmMSwik17j1j4kWz');
    const handle = await client.upload(file);
    console.log(handle);
    this.profile = handle.url;
  }


  constructor(private chatService: ChatService) {
    this.name = '';
    this.password = '';
    this.email = '';
    this.profile = '';
  }

  register() {
    console.log('name: ' + this.name);
    this.chatService.register(this.name, this.email, this.password, this.profile)
  }

  ngOnInit(): void {
  }

}
