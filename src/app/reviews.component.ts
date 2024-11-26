import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'reviews',
  standalone: true,
  imports: [RouterOutlet],
  providers: [DataService],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  reviews_list: any;
  page: number = 1
  constructor(public dataService: DataService) { }
  ngOnInit() {
    if (sessionStorage['page']) {
      this.page = Number(sessionStorage['page']);
    }
    this.reviews_list = this.dataService.getReviews(this.page);
  }
  previousPage() {
    if (this.page > 1) {
      this.page = this.page - 1
      sessionStorage['page'] = this.page;
      this.reviews_list = this.dataService.getReviews(this.page);
    }
  }
  nextPage() {
    if (this.page < this.dataService.getLastPageNumber()) {
      this.page = this.page + 1
      sessionStorage['page'] = this.page;
      this.reviews_list = this.dataService.getReviews(this.page);
    }
  }
}
