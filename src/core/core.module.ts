import { NgModule } from '@angular/core';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { ProgressPage } from '../pages/progress/progress';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SetGoalPage } from '../pages/set-goal/set-goal';
import { IonicModule } from 'ionic-angular';
import { AuthService } from './auth.service';
import { GoalService } from './goals.service';

@NgModule({
  declarations: [
    ProgressPage,
    LoginPage,
    SignupPage,
    SetGoalPage
  ],
  imports: [
    AngularFirestoreModule, 
    AngularFireAuthModule,
    IonicModule.forRoot(LoginPage),
    IonicModule.forRoot(ProgressPage),
    IonicModule.forRoot(SignupPage),
    IonicModule.forRoot(SetGoalPage)
  ],
  entryComponents: [
    ProgressPage,
    LoginPage,
    SignupPage,
    SetGoalPage
  ],
  providers: [
    AuthService,
    GoalService
  ]
})
export class CoreModule {}