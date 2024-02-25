import { Component, Input, OnInit } from '@angular/core';
import { FirebaseTSAuth, FirebaseTSAuthState } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() show!: boolean;

  firestore: FirebaseTSFirestore;
  auth: FirebaseTSAuth;

  constructor() {
    this.firestore = new FirebaseTSFirestore();
    this.auth = new FirebaseTSAuth();
  }

  ngOnInit(): void {
    // Your initialization logic, if needed
  }

  onContinueClick(
    nameInput: HTMLInputElement,
    descriptionInput: HTMLTextAreaElement
  ) {
    let name = nameInput.value;
    let description = descriptionInput.value;

    // Use optional chaining to safely access properties
    const currentUser = this.auth.getAuth()?.currentUser;

    if (currentUser) {
      this.firestore.create({
        path: ["Users", currentUser.uid],
        data: {
          publicName: name,
          description: description
        },
        onComplete: (docId) => {
          alert("Profile created");
          nameInput.value = "";
          descriptionInput.value = "";
        },
        onFail: (err) => {
          // Handle failure
        }
      });
    }
  }
}
