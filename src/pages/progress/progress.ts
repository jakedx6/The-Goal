import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../../core/auth.service';
import { GoalService } from '../../core/goals.service';

@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html'
})
export class ProgressPage {
  goalCount: any;
  theGoals: any;
  theGoal: any;
  userid: any;
  goalCollection: AngularFirestoreCollection<{}>;

  constructor(public navCtrl: NavController,
    public db: AngularFirestore,
    public auth: AuthService,
    private goalSvc: GoalService) {
      
  }
  
  ngOnInit(){
    console.log(this.goalSvc.getTheGoal());
    this.theGoals = this.goalSvc.getTheGoal();
    this.theGoals.subscribe(goal => {
      this.theGoal = goal[0].theGoal;
      this.goalCount = goal[0].count;
      console.log(this.goalCount);
    } )

    
  }


}
