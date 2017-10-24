import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Goal {
	theGoal: string;
}

@Injectable()
export class GoalService {
	userId: string;
	goalsCollection: AngularFirestoreCollection<Goal>;
	goals: Observable<Goal[]>;

	constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) { 
		this.afAuth.authState.subscribe(user => {
		  if(user) this.userId = user.uid
		})
	  }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
//   getGoalList(): FirebaseListObservable<Goal[]> {
//     if (!this.userId) return;
//     this.goals = this.db.list(`goals/${this.userId}`);
//     return this.goals
//   }
//   createGoal(goal: Goal)  {
//     this.goals.push(goal) 
//   }

getTheGoal(){
	this.goalsCollection = this.db.collection('goals');
	this.goals = this.goalsCollection.valueChanges();
}

}
