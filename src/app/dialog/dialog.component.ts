import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLogged => {
      if(isLogged){
        this.dialog.closeAll()
      }
    })
  }

  closeDialog(): void{
    this.dialog.closeAll()
  }

}
