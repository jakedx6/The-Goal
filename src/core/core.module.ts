import { NgModule } from '@angular/core';
import { ProgressPage } from '../pages/progress/progress';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SetGoalPage } from '../pages/set-goal/set-goal';

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