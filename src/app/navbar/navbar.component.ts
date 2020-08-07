import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router'
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component'
import { AuthService } from '../auth.service';
import {DragAndDropComponent} from '../drag-and-drop/drag-and-drop.component'
import {Auth} from 'aws-amplify';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  lastVisitedRouter: string;
  isLoggedIn: boolean;
  constructor(private route: Router, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
          this.lastVisitedRouter = event.url.replace('/', '')
      }
  });
  this.authService.isLoggedIn$.subscribe(isLogged => {
    if(isLogged){
      this.isLoggedIn = true
    }else{
      this.isLoggedIn = false
    }
  })
  }
  openDialog(): void{
    console.log(this.lastVisitedRouter)
    this.dialog.open(DialogComponent);
    // this.authService.isLoggedIn$.subscribe(isLogged => {
    //   if(isLogged){
    //     console.log('asd')
    //   }
    // })
    // dialogRef.close()
  }

  openUpload(): void{
    this.dialog.open(DragAndDropComponent)
  }
  logOut(): void{
    Auth.signOut()
  }
}
