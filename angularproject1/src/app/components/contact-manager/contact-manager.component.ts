import { Component } from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/services/contact.service';
@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent {
public loading:boolean=false;
public contacts:Contact[]=[];
public errorMessage:string|null=null;


constructor(private contactService: ContactService){

}
ngOnInit(): void{
  this.getAllContactsFromServer();
}
public getAllContactsFromServer(){
  this.loading=true;
  this.contactService.getAllContacts().subscribe((data:Contact[])=>{
    this.contacts=data;
    this.loading=false;
   
  },(error)=>{
    this.errorMessage=error;
    this.loading=false;
  }
  );
}
public DeleteContact(contactId: string|undefined){
      if(contactId){
        this.contactService.deleteContact(contactId).subscribe((data)=>{
          this.getAllContactsFromServer();
        },(error)=>{
          this.errorMessage=error
        }
        );
      }
}
}
