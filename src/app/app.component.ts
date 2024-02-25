import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';

import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

interface UserDocument {
  publicNmae: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'upopsocial';
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  userDocument: UserDocument | undefined;

  constructor(private loginSheet: MatBottomSheet, private router: Router) {
    this.auth.listenToSignInStateChanges(user => {
      this.auth.checkSignInState({
        whenSignedIn: user => {},
        whenSignedOut: user => {},
        whenSignedInAndEmailNotVerified: user => {
          this.router.navigate(["emailVerification"]);
        },
        whenSignedInAndEmailVerified: user => {
          this.getUserProfile();
        },
        whenChanged: user => {}
      });
    });
  }

  getUserProfile() {
    const currentUser = this.auth.getAuth()?.currentUser;
    const uid = currentUser?.uid || 'default';

    this.firestore.listenToDocument({
      name: "Getting Document",
      path: ["Users", uid],
      onUpdate: result => {
        this.userDocument = <UserDocument>result.data() as UserDocument;
        this.userHasProfile = result.exists;
        if (this.userHasProfile) {
          this.router.navigate(["postfeed"]);
        }
      }
    });
  }

  onLogoutClick() {
    this.auth.signOut();
  }

  loggedIn() {
    return this.auth.isSignedIn();
  }

  onLoginClick() {
    this.loginSheet.open(AuthenticatorComponent);
  }

}
