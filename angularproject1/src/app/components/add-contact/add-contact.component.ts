import { Component } from '@angular/core';
import { group } from 'src/app/models/group';
import { Contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {

public loading: boolean=false;
public contact: Contact={} as Contact;
public errorMessage: string|null=null;
public groups : group[]=[] as group[];

constructor(private contactService: ContactService, private router: Router){

}

ngOnInit(): void{
  this.contactService.getAllGroups().subscribe((data)=>{
    this.groups=data;
  },(error)=>{
    this.errorMessage=error;
  }
  );
}

public createSubmit(){
 this.contactService.createContact(this.contact).subscribe((data)=>{
 this.router.navigate(['/']).then();
 },(error)=>{
  this.errorMessage=error;
  this.router.navigate(['/contacts/add']).then();
 }
 
 
 
 ); 
}




}
