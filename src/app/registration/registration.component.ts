import { Component } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  name: string;
  password: string;
  email: string;
  selectedFile: any;
  base64: string | undefined;
  handleReaderLoaded: any;


  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
   
  }
  



  constructor(private chatService: ChatService) {
    this.name = '';
    this.password = '';
    this.email = '';
  }

  register() {
    console.log('name: ' + this.name);
    this.chatService.register(this.name, this.email, this.password)
  }

  ngOnInit(): void {
  }

}
