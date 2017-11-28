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
	count: number,
	countChange: number
}


@Injectable()
export class GoalService {
	navCtrl: any;
	user: any;
	goals: Observable<Goal[]>;
	goalsCollection = this.db.collection('goals');
	currentUserId = this.auth.getUserId();
	currentUsername = this.auth.getUserName();
	theGoal = this.db.collection<Goal>('goals', ref => ref.where('uid', '==', this.currentUserId));
	historyListQuery = this.theGoal.doc("Goal " + this.currentUsername).collection<History>("history", ref => ref.orderBy('createdAt', 'desc'));

	constructor(private db: AngularFirestore, private auth: AuthService) { }

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
		this.saveNewGoalCount(0, 0);
	}


	getTheGoal() {
		return this.theGoal.valueChanges()
	}

	getTheHistory() {
		return this.historyListQuery.valueChanges()
	}

	saveNewGoalCount(change, oldCount) {
		this.goalsCollection.doc("Goal " + this.currentUsername).collection("history").add({
			createdAt: new Date(),
			count: (change + oldCount),
			countChange: change
		})
			.then(function () {
				console.log("Save successfully!");
			})
			.catch(function (error) {
				console.error("Error writing document: ", error);
			});
	}

	endTheGoal() {
		this.theGoal.doc("Goal " + this.currentUsername).delete();
	}

	uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
}
