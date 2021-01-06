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
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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

import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { postsReducer } from './new/new.reducer'
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './effects/posts.effects';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { PageContainerComponent } from './page-container/page-container.component';


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
    CommentsComponent,
    PageContainerComponent
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
    MatInputModule,
    MatProgressSpinnerModule,
    AmplifyUIAngularModule,
    ShareButtonsModule,
    ShareIconsModule,
    MatDialogModule,
    StoreModule.forRoot({post: postsReducer}, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictActionWithinNgZone: false,
        strictActionTypeUniqueness: false,
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([PostEffects]),
    MatAutocompleteModule
  ],
  entryComponents: [
    DialogComponent,
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  },
  {
    provide: MAT_DIALOG_DATA,
    useValue:{}
  }, DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(_auth: AuthService){
    console.log('starting AppModule')
  }
}
