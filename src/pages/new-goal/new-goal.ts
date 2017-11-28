import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProgressPage } from '../progress/progress';
import { AuthService } from '../../core/auth.service';
import { GoalService } from '../../core/goals.service';

@Component({
  selector: 'page-newgoal',
  templateUrl: 'new-goal.html'
})
export class NewGoalPage {
  goalCollection: any;
  theGoal: any;
  goal: any;

  constructor(
    public navCtrl: NavController,
    public auth: AuthService,
    private goalSvc: GoalService
  ) {}

  ngOnInit(){
    this.goalCollection = this.goalSvc.goalsCollection;
  }

  goToProgress(params) {
    if (!params) params = {};
    this.navCtrl.push(ProgressPage);
  }

  logout() {
    this.auth.logout();
  }
  createGoal() {
     this.goalSvc.createGoal(this.goal)
     this.navCtrl.push(ProgressPage);
  }

}

