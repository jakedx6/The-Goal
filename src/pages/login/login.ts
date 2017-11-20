import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public afAuth: AuthService) {
  }
  
  loginGoogle() {
    this.afAuth.googleLogin();
  }

 // loginFacebook() {
  //  this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());    
 // }

}
