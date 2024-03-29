import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'


export interface User {
	uid: string;
	email: string;
	photoURL?: string;
	displayName?: string;
}

@Injectable()
export class AuthService {
	user: Observable<User>;

	constructor(private afAuth: AngularFireAuth,
		private afs: AngularFirestore) {
		this.user = this.afAuth.authState
			.switchMap(user => {
				if (user) {
					return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
				} else {
					return Observable.of(null)
				}
			})
	}

	private updateUserData(user) {
		// Sets user data to firestore on login
		const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
		const data: User = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL
		}
		return userRef.set(data)
	}

	getUserId() {
		return this.afAuth.auth.currentUser.uid
	}

	getUserName() {
		return this.afAuth.auth.currentUser.displayName
	}

	googleLogin() {
		const provider = new firebase.auth.GoogleAuthProvider()
		return this.oAuthLogin(provider);
	}

	private oAuthLogin(provider) {
		return this.afAuth.auth.signInWithRedirect(provider)
			.then((credential) => {
				this.updateUserData(credential.user)
			})
	}

	isLoggedIn() {
		if (this.afAuth.auth.currentUser == null) {
			return false;
		}
		return true;
	}

	logout() {
		this.afAuth.auth.signOut();
	};

}
