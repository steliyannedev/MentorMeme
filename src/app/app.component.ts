import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './auth.service';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  user: CognitoUserInterface | undefined;
  authState: AuthState;


  title = 'MentorMeme';
  constructor(private authService: AuthService, private ref: ChangeDetectorRef){}
  ngOnInit(): void {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    })
  }
  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}

