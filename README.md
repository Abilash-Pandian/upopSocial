# Upopsocial

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

Firebase Authentication:

Enable Firebase Authentication methods (email/password, Google Sign-In, etc.) based on your project requirements.
Set up sign-in methods and configure them according to your preferences.
This will typically involve setting up users with unique UIDs, emails, and other user-related information.
Firestore Database:

Create collections for storing data. In your case, you have a "Posts" collection.
Each post document within the "Posts" collection should have fields like comment, creatorId, imageUrl, timestamp, etc.
You might have a separate "Users" collection for storing user profiles.
