import { Component, OnInit } from '@angular/core';
import {  Event, NavigationStart } from '@angular/router'
import {Router} from "@angular/router"
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component'
import { AuthService } from '../auth.service';
import {DragAndDropComponent} from '../drag-and-drop/drag-and-drop.component'
import {Auth} from 'aws-amplify';
import { NavbarService } from './navbar.service'


import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  lastVisitedRouter: string;
  isLoggedIn: boolean;
  control = new FormControl();
  searchResults: any[] = [];
  filteredStreets: Observable<string[]>;

  constructor(
    public dialog: MatDialog, 
    private authService: AuthService, 
    private navBarService: NavbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
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

    this.control.valueChanges.subscribe(x => {
      this.test(x)
    })
    
    
  }
  displayFn(){
    this.router.navigate([`/post/${this.control.value.post_id}`])
  }
  displayValue(post){
    return post && post.post_title
  }
  redirectHome(){
    this.router.navigate([``])
  }
  test(word){
    this.navBarService.searchPost(word).subscribe(value => {
      this.searchResults = []
      value.forEach( val => {
        this.searchResults.push(val)
      })
    })
  }

  openDialog(): void{
    this.dialog.open(DialogComponent);
  }

  openUpload(): void{
    this.dialog.open(DragAndDropComponent)
  }
  logOut(): void{
    Auth.signOut()
  }
}
