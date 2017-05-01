import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';   

@Injectable()
export class GlobalProfileService {
 _profile = new Subject();

 set profile(value) {
   this._profile.next(value); // this will make sure to tell every subscriber about the change.
   localStorage.setItem('profile', value);
 }

 get profile() {
   return localStorage.getItem('profile');
 }
}