import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReviewsComponent } from './reviews.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReviewsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CamReview';
}
