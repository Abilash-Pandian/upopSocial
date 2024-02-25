import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Import CommonModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';

import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';  
import { MatCardModule } from '@angular/material/card';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { ProfileComponent } from './tools/profile/profile.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreatePostComponent } from './tools/create-post/create-post.component';

import { PostFeedComponent } from './pages/post-feed/post-feed.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticatorComponent,
    EmailVerificationComponent,
    ProfileComponent,
    CreatePostComponent,

    PostFeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    CommonModule, // Add CommonModule to the imports
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    FirebaseTSApp.init(environment.firebaseConfig);
  }
}
