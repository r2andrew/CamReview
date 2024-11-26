import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReviewsComponent } from './reviews.component';
import { NavComponent } from './nav.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReviewsComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
