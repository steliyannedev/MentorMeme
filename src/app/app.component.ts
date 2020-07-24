import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  user: {id: string; username: string; email: string}

  title = 'MentorMeme';
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(
      isLoggedIn => (this.isLoggedIn = isLoggedIn)
    );
    this.authService.auth$.subscribe(({id, username, email}) => {
      this.user = {id, username, email}
    })
  }
}

