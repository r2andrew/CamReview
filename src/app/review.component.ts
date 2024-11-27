import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
import { WebService } from './web.service';


@Component({
  selector: 'review',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [DataService, WebService],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  reviews_list: any;

  constructor( public dataService: DataService,
               private route: ActivatedRoute,
               private webService: WebService) {}

  ngOnInit() {
    this.webService.getReview(
      this.route.snapshot.paramMap.get('id'))
      .subscribe( (response: any) => {
        this.reviews_list = [response];
      });
  }
}
