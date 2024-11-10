import { Injectable } from '@angular/core';
import { User, UserLoginPayload, UserPayload } from 'src/app/Interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userURL:string = "http://localhost:5000/user";

  constructor() {
    console.log('Service init')
  }

  public async loginUser(user: UserLoginPayload) {
    const response = await fetch(this.userURL + '/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(user)
    });

    const jsonStatus = await response.status;
    const jsonMessage = await response.json();

    if (jsonStatus == 200 || jsonStatus == 201) {
      // Saves user data into userStore
      return {
        user: {
          id: jsonMessage.id,
          username: user.username as string,
          name: jsonMessage.name,
          email: jsonMessage.email,
          password: user.password as string,
          createdAt: jsonMessage.created_at,
          lastLogin: jsonMessage.login_time,
          login: true,
          loginDays: jsonMessage.login_days,
          previousTasks: jsonMessage.tasksWithFormattedDate,
        } as User,
        message: null,
      }
    } else {
      return {
        user: null,
        message: jsonMessage.message,
      }
    }
  }

  public async createUser(user: UserPayload) {
    const response = await fetch(this.userURL + '/register', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(user)
    })

    const jsonStatus = await response.status;
    const jsonMessage = await response.json();

    if (jsonStatus == 200 || jsonStatus == 201) {
      // Saves user data into userStore
      return {
        user: {
          id: jsonMessage.id,
          username: user.username as string,
          name: user.name as string,
          email: user.email as unknown as string,
          password: user.password as string,
          createdAt: jsonMessage.createdAt,
          lastLogin: jsonMessage.lastLogin,
          login: true,
          loginDays: [],
          previousTasks: [],
        } as User,
        message: null,
      };
    } else {
      return {
        user: null,
        message: jsonMessage.message,
      };
    }
  }
}
