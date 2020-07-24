import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrendingComponent } from './trending/trending.component';
import { HotComponent } from './hot/hot.component';
import { NewComponent } from './new/new.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostDetailsComponent } from './post-details/post-details.component'


const routes: Routes = [
  { path: '', redirectTo: '/new', pathMatch: 'full' },
  { path: 'trending', component: TrendingComponent },
  { path: 'hot', component: HotComponent },
  { path: 'new', component: NewComponent },
  { path: 'post/:id', component: PostDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
