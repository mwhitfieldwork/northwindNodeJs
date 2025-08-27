import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../../models/user.model";

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private sessionSubject = new BehaviorSubject<User | null>(null);
  private token!: string;

  getToken(): string {
    return this.token;
  }

  setAuthState(token: string) {
    this.token = token;
  }

}
