import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  deleteChat(id: number) {
    return fetch('http://localhost:8000/api/chats/'+id, {method: 'DELETE'})
}


  constructor(private router: Router) { }

  addChat(message: string) {
    // check if object is properly created
    console.log(JSON.stringify({
      message: message,
      user_id: window.localStorage.getItem('userId')
    }));
    // fetch the API in post mode
    return fetch('http://localhost:8000/api/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: message,
        user_id: window.localStorage.getItem('userId')
      })
    })
      .then(response => {
        console.log(response.status);
        if (response.status == 201) {
          // display a succes message to the user - optional
          // alert("Message added");
        } else {
          alert("Something went wrong");
        }
      })
  }

  getChatsFromApi() {
    return fetch('http://localhost:8000/api/chats')
      .then(response => {
        console.log(response)
        return response.json()
      })
  }

  register(name: string, email: string, password: string) {

    console.log(JSON.stringify({
      name: name,
      email: email,
      password: password
    }));
    fetch('http://localhost:8000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(response => {
        console.log(response.status);
        if (response.status == 201) {
          alert("Registration successful");
          this.router.navigate(['/login']);
        } else {
          alert("Something went wrong");
        }
      })
  }


  getUsersFromApi(username: string, password: string) {
    console.log(username, password);
    fetch('http://localhost:8000/api/users/' + username)
      .then(response => response.json())
      .then(data => {
        console.log(data[0].password);
        bcrypt.compare(password, data[0].password, (err, res) => {
          if (res) {
            window.localStorage.setItem('username', username);
            window.localStorage.setItem('userId', data[0].id);
            this.router.navigate(['/secure']);
          } else {
            alert("Wrong password");
          }
        });
      })
  };

}
