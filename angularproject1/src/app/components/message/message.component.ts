import { Component } from '@angular/core';
import { Contact } from 'src/app/models/Contact';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
 public contact :Contact={} as Contact;
 public showme=false;
 public notshow=true;
 public bigshow=false;
  showm(){
   setTimeout(()=>{
     this.showme=true
     
   },500)
this.notshow=false;
if(!this.notshow){
this.bigshow=true
}
 }
 
}
