import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrendingComponent } from './trending/trending.component';
import { HotComponent } from './hot/hot.component';
import { NewComponent } from './new/new.component';
import { MatToolbarModule } from  '@angular/material/toolbar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import { AuthService } from './auth.service'
import { DialogComponent } from './dialog/dialog.component';

/* Add Amplify imports */
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { DragAndDropDirective } from './drag-and-drop.directive';
import { ProgressComponent } from './progress/progress.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { CommentboxComponent } from './commentbox/commentbox.component';
import { CommentsComponent } from './comments/comments.component';

/* Configure Amplify resources */
Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    NavbarComponent,
    SidebarComponent,
    TrendingComponent,
    HotComponent,
    NewComponent,
    DialogComponent,
    DragAndDropComponent,
    DragAndDropDirective,
    ProgressComponent,
    PostDetailsComponent,
    CommentboxComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    AmplifyUIAngularModule ,
    MatDialogModule
  ],
  providers: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(_auth: AuthService){
    console.log('starting AppModule')
  }
}
