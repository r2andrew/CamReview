import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';
import { NgForOf, NgClass, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'reviews',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgForOf, NgClass, NgIf, ReactiveFormsModule],
  providers: [DataService],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  reviews_list: any;
  page: number = 1
  reviewForm: any;

  constructor(public dataService: DataService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {}

  onSubmit() {
    this.dataService.postReview(
      this.route.snapshot.paramMap.get('id'),
      this.reviewForm.value);
    this.reviewForm.reset();
  }

  isUntouched() {
    return this.reviewForm.controls.username.pristine ||
      this.reviewForm.controls.title.pristine ||
      this.reviewForm.controls.body.pristine ||
      this.reviewForm.controls.file.pristine;
  }
  isIncomplete() {
    return this.isInvalid('username') ||
      this.isInvalid('title') ||
      this.isInvalid('body') ||
      this.isInvalid('file') ||
      this.isUntouched();
  }

  isInvalid(control: any) {
    return this.reviewForm.controls[control].invalid &&
      this.reviewForm.controls[control].touched;
  }

  ngOnInit() {
    if (sessionStorage['page']) {
      this.page = Number(sessionStorage['page']);
    }
    this.reviews_list = this.dataService.getReviews(this.page);

    this.reviewForm = this.formBuilder.group( {
      username: ['', Validators.required],
      title:['', Validators.required],
      body: ['', Validators.required],
      rating: 5,
      file: ['', Validators.required]
    })

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
