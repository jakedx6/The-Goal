import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProgressPage } from '../progress/progress';
import { AuthService } from '../../app/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-set-goal',
  templateUrl: 'set-goal.html'
})
export class SetGoalPage {
  items: Observable<any[]>;
  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public auth: AuthService
  ) {}

  goToProgress(params) {
    if (!params) params = {};
    this.navCtrl.push(ProgressPage);
  }

  logout() {
    this.auth.logout();
  }
}
