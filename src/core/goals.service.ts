import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

export interface Goal {
	uid: string;
	theGoal: any;
	createdAt: Date;
}

export interface History {
	createdAt: Date,
	count:  number,
	countChange: number 
}


@Injectable()
export class GoalService {
	user: any;
	goals: Observable<Goal[]>;
	goalsCollection = this.db.collection('goals');
	currentUserId = this.auth.getUserId();
	currentUsername = this.auth.getUserName();
	thegoal = this.db.collection<Goal>('goals', ref => ref.where('uid', '==', this.currentUserId));
	historylist = this.thegoal.doc("Goal " + this.currentUsername).collection<History>("history", ref => ref.orderBy('createdAt', 'desc'));

	constructor(private db: AngularFirestore, private auth: AuthService) {}

	createGoal(goal: Goal) {
		this.goalsCollection.doc("Goal " + this.currentUsername).set({
			uid: this.currentUserId,
			theGoal: goal,
			createdAt: new Date()
		})
			.then(function () {
				console.log("Document successfully written!");
			})
			.catch(function (error) {
				console.error("Error writing document: ", error);
			});
	}


	getTheGoal(){
		return this.thegoal.valueChanges()
	}

	getTheHistory(){
		return this.historylist.valueChanges()
	}

	saveNewGoalCount(change, oldCount){
		this.goalsCollection.doc("Goal " + this.currentUsername).collection("history").add({
			createdAt: new Date(),
			count: (change + oldCount),
			countChange: change 
		})
	}
}
