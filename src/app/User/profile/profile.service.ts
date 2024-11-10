import { Injectable } from '@angular/core';
import { json } from 'd3';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  public async getMostPracticedVerbs(id:number) {
    const response = await fetch(`http://localhost:5000/verbs/profile/${id}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })

    const jsonResponse = await response.json();

    return jsonResponse;
  }
}
