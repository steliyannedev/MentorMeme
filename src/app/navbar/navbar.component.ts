import { Component, OnInit, Inject } from '@angular/core';
import {  Event, NavigationStart } from '@angular/router'
import {Router} from "@angular/router"
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component'
import { AuthService } from '../auth.service';
import {DragAndDropComponent} from '../drag-and-drop/drag-and-drop.component'
import {Auth} from 'aws-amplify';
import { NavbarService } from './navbar.service'

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


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
  dialogRef;
  modalRef;
  
  constructor(
    public dialog: MatDialog, 
    private authService: AuthService, 
    private navBarService: NavbarService,
    private router: Router,
    private dialogReff: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.control.setValue('')
        this.lastVisitedRouter = event.url.replace('/', '')
        if(this.lastVisitedRouter == ''){
          this.lastVisitedRouter = 'new'
        }
      }
    });
    this.authService.isLoggedIn$.subscribe(isLogged => {
      if(isLogged){
        this.isLoggedIn = true
        if(this.modalRef != undefined){
          this.modalRef.close()
        }
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
    this.control.setValue('')
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
    this.modalRef = this.modal.open(DialogComponent)
  }

  openUpload(): void{
    this.dialog.open(DragAndDropComponent)
  }
  logOut(): void{
    Auth.signOut()
  }
}
