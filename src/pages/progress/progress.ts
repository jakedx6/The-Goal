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
  theHistory: any;
  theCount: any;
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
    this.theGoals = this.goalSvc.getTheGoal();
    this.theGoals.subscribe(goal => {
      this.theGoal = goal[0].theGoal;
    } )
    this.refreshCount(); 
    this.theHistory = this.goalSvc.getTheHistory();
  }

  addOne(value){
    this.goalSvc.saveNewGoalCount(1,this.theCount);
    this.refreshCount();
  }

  subtractOne(value){
    this.goalSvc.saveNewGoalCount(-1,this.theCount);
    this.refreshCount();
  }

  refreshCount(){
    this.theHistory = this.goalSvc.getTheHistory();
    this.theHistory.subscribe(count => {
      if (count == undefined || count.length == 0 ) {
         this.goalSvc.saveNewGoalCount(0,0);
         this.refreshCount();
       } else {
        this.theCount =  count[0].count;
       } 
    } )
  }

}
