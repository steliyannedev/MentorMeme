import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostDetailsService } from './post-details.service'
import * as moment from 'moment'


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  comments: any = [];
  data: any = {}
  count = 0;
  uplaoded: string;
  loaded: boolean = false;
  @ViewChild('thisDiv') scrollTo: ElementRef;

  constructor(private router: ActivatedRoute, private postDetailService: PostDetailsService) { }

  ngOnInit(): void {
    this.postDetailService.getPostDetails(this.router.params['value']['id']).subscribe( data => {this.data = data; this.uplaoded = moment(data['created_on']).fromNow(); this.loaded = true})
    this.postDetailService.getPostComments(this.router.params['value']['id']).subscribe( comments => {this.comments = comments; this.count = this.comments.length}) 

    if(this.router.fragment['_value'] == 'comments'){
      const interval = setInterval(() => {
        this.scrollTo.nativeElement.scrollIntoView({behavior: 'smooth'})
        clearInterval(interval)
      }, 1000)
    }

  }

  receiveComment($event) {
    this.comments.push($event[0]);
    this.count = this.comments.length;
  }

  recieveCount($event) {
    this.comments = $event;
    this.count = this.comments.length;
  }

}
