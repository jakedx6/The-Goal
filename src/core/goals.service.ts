import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

export interface Goal {
	uid: string;
	theGoal: any;
	count: number;
	createdAt: Date;
}


@Injectable()
export class GoalService {
	user: any;
	userId: string;
	currentUserId: string;
	goalsCollection: AngularFirestoreCollection<Goal>;
	goals: Observable<Goal[]>;

	constructor(private db: AngularFirestore,
		private afAuth: AngularFireAuth,
		private auth: AuthService) {
		this.afAuth.authState.subscribe(user => {
			if (user) this.userId = user.uid
		})
	}

	createGoal(goal: Goal) {
		this.goalsCollection = this.db.collection('goals'); // collection reference 
		
		this.goalsCollection.doc("Goal " + this.auth.getUserName()).set({
			uid: this.userId,
			theGoal: goal,
			count: 0,
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
		this.currentUserId = this.auth.getUserId();	
		let thegoal = this.db.collection<Goal>('goals', ref => ref.where('uid', '==', this.currentUserId)); // collection reference
		return thegoal.valueChanges();
	}

}
