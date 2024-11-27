import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
import { WebService } from './web.service';


@Component({
  selector: 'review',
  standalone: true,
  imports: [CommonModule],
  providers: [DataService, WebService],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  reviews_list: any;

  constructor( public dataService: DataService,
               private route: ActivatedRoute,
               private webService: WebService,
               private router: Router) {}

  ngOnInit() {
    this.webService.getReview(
      this.route.snapshot.paramMap.get('id'))
      .subscribe( (response: any) => {
        this.reviews_list = [response];
      });
  }

  onDelete() {
    this.webService.deleteReview(
      this.route.snapshot.paramMap.get('id'))
      .subscribe( (response: any) => {
        this.router.navigate([''])
      });
  }
}
