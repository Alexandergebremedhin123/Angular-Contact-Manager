import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Contact } from '../models/Contact';
import { HttpErrorResponse } from '@angular/common/http';
import {group} from '../models/group'
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private static serverUrl:string="https://angular-contact-manager.onrender.com";

  constructor(private httpClient:HttpClient) { }

public getAllContacts():Observable<Contact[]>{
  let dataURL: string= `${ContactService.serverUrl}/contacts`;
  return this.httpClient.get<Contact[]>(dataURL).pipe(catchError(this.handleError));
}


public getContact(contactId:string):Observable<Contact>{
  let dataURL:string=`${ContactService.serverUrl}/contacts/${contactId}`;
  return this.httpClient.get<Contact>(dataURL).pipe(catchError(this.handleError));
}

public createContact(contact: Contact):Observable<Contact>{
  let dataURL: string= `${ContactService.serverUrl}/contacts`;
  return this.httpClient.post<Contact>(dataURL,contact).pipe(catchError(this.handleError));

}
public updateContact(contact: Contact, contactId:string):Observable<Contact>{
  let dataURL: string= `${ContactService.serverUrl}/contacts/${contactId}`;
  return this.httpClient.put<Contact>(dataURL,contact).pipe(catchError(this.handleError));

}
public deleteContact( contactId:string):Observable<{}>{
  let dataURL: string= `${ContactService.serverUrl}/contacts/${contactId}`;
  return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError));

}
public getAllGroups():Observable<group[]>{
  let dataURL: string= `${ContactService.serverUrl}/groups`;
  return this.httpClient.get<group[]>(dataURL).pipe(catchError(this.handleError));
}


public getGroup(contact:Contact):Observable<group>{
  let dataURL:string=`${ContactService.serverUrl}/groups/${contact.groupId}`;
  return this.httpClient.get<group>(dataURL).pipe(catchError(this.handleError));

}


 public handleError(error:HttpErrorResponse){
let errorMessage:string='';
if(error.error instanceof ErrorEvent){
  errorMessage=`Error : ${error.error.message}`
}
else{
  errorMessage=`Status : ${error.status} \n Message: ${error.message}`;
}
return throwError(errorMessage);
 }
 

}
