import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/Contact';
import { group } from 'src/app/models/group';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
public loading:boolean=false;
public contactId: string | null= null;
public contact:Contact={} as Contact;
public group:group={} as group;
public errorMessage : string | null=null;
constructor(private activatedRoute: ActivatedRoute,private contactService:ContactService){

}

ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe((param)=>{
    this.contactId=param.get('contactId');
  });
  if(this.contactId){
    this.loading=true;
    this.contactService.getContact(this.contactId).subscribe((data)=>{
      this.contact=data;
      this.loading=false;
      this.contactService.getGroup(data).subscribe((data)=>{
        this.group=data;
        // console.log(data); 
    }
   );
    
    },(error)=>{
        this.errorMessage=error;
        this.loading=false;
    }
   
    
    );
  }

}
  public isNotEmpty(){
    return Object.keys(this.contact).length>0&&Object.keys(this.group).length>0;
  }


}
