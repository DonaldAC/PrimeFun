import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatService } from './chat.service';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [ChatComponent, MessagesComponent],
  imports: [CommonModule],
  providers: [ChatService],
  exports: [ChatComponent],
})
export class ChatModule {}
