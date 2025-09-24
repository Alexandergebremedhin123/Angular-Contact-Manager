import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Name } from 'src/app/models/Name';
import { RatingService } from 'src/app/services/rating.service';
@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent {
  public loading: boolean=false;
  public contactId: string|null=null;
  public contact:Name={} as Name;
  public errorMessage: string|null=null;


constructor(private activatedRoute: ActivatedRoute,private contactService: RatingService
                ,private router : Router){

}
ngOnInit(): void{
  this.loading=true;
  this.activatedRoute.paramMap.subscribe((param)=>{
        this.contactId=param.get('contactId');
  });
  if(this.contactId){
    this.contactService.getContact(this.contactId).subscribe((data)=>{
      this.contact=data;
      this.loading=false;
      this.contactService.getAllGroups().subscribe((data)=>{
      });
    },(error)=>{
      this.errorMessage=error;
      this.loading=false;
    }
    );
  }
}
public updateState(){
     if(this.contactId){
      this.contactService.updateContact(this.contact,this.contactId).subscribe((data)=>{
        this.router.navigate(['/']).then();
        },(error)=>{
         this.errorMessage=error;
         this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
        }
        
        
        
        ); 
     }
 

}

}
