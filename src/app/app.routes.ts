import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ReviewsComponent } from './reviews.component';
import { ReviewComponent } from './review.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'reviews',
    component: ReviewsComponent
  },
  {
    path: 'reviews/:id',
    component: ReviewComponent
  }
];
