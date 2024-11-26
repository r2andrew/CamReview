import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';
@Component({
  selector: 'review',
  standalone: true,
  imports: [RouterOutlet],
  providers: [DataService],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  reviews_list: any;

  constructor( public dataService: DataService,
               private route: ActivatedRoute) {}

  ngOnInit() {
    this.reviews_list = this.dataService.getReview(this.route.snapshot.paramMap.get('id'));
  }
}
