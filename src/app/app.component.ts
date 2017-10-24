import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../core/auth.service';

import { SetGoalPage } from '../pages/set-goal/set-goal';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html',
  providers: [AuthService]
})
export class MyApp {
  user = null;
  rootPage: any = LoginPage

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }

  ngOnInit() {
    this.auth.user.subscribe(() => {
        this.auth.isLoggedIn() ? this.rootPage = SetGoalPage : this.rootPage = LoginPage;
      }
    );
    console.log('after ' + this.auth.user);
  }

}
