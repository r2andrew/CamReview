import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReviewsComponent } from './reviews.component';
import jsonData from '../assets/reviews.json';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReviewsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  ngOnInit() {
    console.log(jsonData);
  }
}
