import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProgressPage } from '../progress/progress';

@Component({
  selector: 'page-set-goal',
  templateUrl: 'set-goal.html'
})
export class SetGoalPage {

  constructor(public navCtrl: NavController) {
  }
  goToProgress(params){
    if (!params) params = {};
    this.navCtrl.push(ProgressPage);
  }
}
