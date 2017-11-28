import { NgModule } from '@angular/core';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { ProgressPage } from '../pages/progress/progress';
import { LoginPage } from '../pages/login/login';
import { NewGoalPage } from '../pages/new-goal/new-goal';
import { SetGoalPage } from '../pages/set-goal/set-goal';
import { IonicModule } from 'ionic-angular';
import { AuthService } from './auth.service';
import { GoalService } from './goals.service';

@NgModule({
  declarations: [
    ProgressPage,
    LoginPage,
    NewGoalPage,
    SetGoalPage
  ],
  imports: [
    AngularFirestoreModule, 
    AngularFireAuthModule,
    IonicModule.forRoot(LoginPage),
    IonicModule.forRoot(ProgressPage),
    IonicModule.forRoot(NewGoalPage),
    IonicModule.forRoot(SetGoalPage)
  ],
  entryComponents: [
    ProgressPage,
    LoginPage,
    NewGoalPage,
    SetGoalPage
  ],
  providers: [
    AuthService,
    GoalService
  ]
})
export class CoreModule {}