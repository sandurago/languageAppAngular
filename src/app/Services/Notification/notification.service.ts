import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor (private messageService: MessageService) {};

  showNotification(severity:string, message:string): void {
    this.messageService.add({severity: severity, detail: message});
  }
}
