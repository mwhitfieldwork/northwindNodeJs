import { Directive, inject, input, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserSessionService } from '../../services/user-session/user-session.service';
import { Authentication } from '../../models/authentication';

@Directive({
  selector: '[appDisplayLink]',
  standalone: true
})
export class DisplayLinkDirective implements OnInit{
 //@Input('appDisplayLink') userType!:string;
 private  _userSessionService = inject(UserSessionService);
 private templateRef = inject(TemplateRef); //gives access to ng-template
 private viewContainerRef = inject(ViewContainerRef); //gives access to where int the DOM the directive is being used

 userId!:string;
 user!:Authentication | null;

  ngOnInit(): void {
    const userId = localStorage.getItem('user');

    if (userId) {
        this.userId = JSON.parse(userId); 
        this.getUser();
    }
  }
  getUser(){
    if(this.userId) {
      this._userSessionService.getUser(this.userId).subscribe((response) => {
        this.user = response;
        if(this.user?.admin){
          this.viewContainerRef.createEmbeddedView(this.templateRef);
         }else{
          this.viewContainerRef.clear();
         }
      });
    }
  }


}
