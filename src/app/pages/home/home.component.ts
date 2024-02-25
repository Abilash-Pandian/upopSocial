import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from '../../tools/authenticator/authenticator.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private loginSheet: MatBottomSheet){}
  ngOnInit(): void{

  }
  onGetStartedClick(){
    this.loginSheet.open(AuthenticatorComponent);
  }
}
