import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NgForOf, NgClass, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { WebService } from './web.service';
import { ModalComponent } from './modal.component';
import {ModalService} from './modal.service';


@Component({
  selector: 'reviews',
  standalone: true,
  imports: [RouterModule, NgForOf, NgClass, NgIf, ReactiveFormsModule, ModalComponent],
  providers: [WebService, ModalService],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  reviews_list: any;
  page: number = 1
  reviewForm: any;
  file: File | null = null;
  totalPages: number = 1;
  baseBlobUrl: string = "https://crstorageaccount46.blob.core.windows.net";
  reviews_loaded: boolean = false;
  new_review_loading: boolean = false;


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private webService: WebService,
              public modalService: ModalService) {}

  // pull file on selection
  onChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

  onSubmit() {
    this.webService.postReview(
      this.reviewForm.value,
      this.file)
      .subscribe( (response) => {
        this.modalService.close();
        this.reviewForm.reset();
        this.new_review_loading = true;
        this.webService.getReviews(this.page)
          .subscribe((response) => {
            this.reviews_list = response['reviews'];
            this.totalPages = response['totalPages'];
            this.processIfEdited();
            this.reviews_loaded = true;
            this.new_review_loading = false;
          })
      });
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

  processIfEdited() {
    for (var review= 0; review < this.reviews_list.length; review++) {
      if (this.reviews_list[review]['createdTime'] != this.reviews_list[review]['modifiedTime']) {
        this.reviews_list[review] = Object.assign({}, this.reviews_list[review], {edited: true})
      } else {
        this.reviews_list[review] = Object.assign({}, this.reviews_list[review], {edited: false})
      }
    }
  }

  ngOnInit() {
    if (sessionStorage['page']) {
      this.page = Number(sessionStorage['page']);
    }
    this.webService.getReviews(this.page)
      .subscribe((response) => {
        this.reviews_list = response['reviews'];
        this.totalPages = response['totalPages'];
        this.processIfEdited();
        this.reviews_loaded = true;
      })

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
      this.reviews_loaded = false
      this.page = this.page - 1
      sessionStorage['page'] = this.page;
      this.webService.getReviews(this.page)
        .subscribe((response: any) => {
          this.reviews_list = response['reviews'];
          this.totalPages = response['totalPages'];
          this.processIfEdited()
          this.reviews_loaded = true;
        })
    }
  }
  nextPage() {
    if (this.page < this.totalPages) {
      this.reviews_loaded = false
      this.page = this.page + 1
      sessionStorage['page'] = this.page;
      this.webService.getReviews(this.page)
        .subscribe((response: any) => {
          this.reviews_list = response['reviews'];
          this.totalPages = response['totalPages']
          this.processIfEdited()
          this.reviews_loaded = true;
        })
     }
  }
}
