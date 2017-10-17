import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProgressPage } from '../progress/progress';
import { AuthService } from '../../app/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { GoalService } from '../../app/goals.service';

@Component({
  selector: 'page-set-goal',
  templateUrl: 'set-goal.html'
})
export class SetGoalPage {
  goalsCollection: any;
  goal: string;

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public auth: AuthService,
    private goalSvc: GoalService
  ) {}

  ngOnInit(){
    this.goalsCollection = this.goalSvc.goalsCollection;
    this.goal = this.goalsCollection.valueChanges();
  }

  goToProgress(params) {
    if (!params) params = {};
    this.navCtrl.push(ProgressPage);
  }

  logout() {
    this.auth.logout();
  }
  createGoal() {
    // console.log(this.goal);
    // this.goalSvc.createGoal(this.goal)
    // this.navCtrl.push(ProgressPage);
  }

}
