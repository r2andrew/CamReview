import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebService } from './web.service';
import { ModalService } from './modal.service';
import { ModalComponent } from './modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'review',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule, ReactiveFormsModule],
  providers: [WebService, ModalService],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  reviews_list: any;
  editForm: any;
  baseBlobUrl: string = "https://crstorageaccount46.blob.core.windows.net";
  review_loaded = false;


  constructor( private route: ActivatedRoute,
               private webService: WebService,
               private router: Router,
               public modalService: ModalService,
               private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.webService.getReview(
      this.route.snapshot.paramMap.get('id'))
      .subscribe( (response: any) => {
        this.reviews_list = [response];
        this.review_loaded = true;


        this.processIfEdited()
        console.log(this.reviews_list)

        this.editForm = this.formBuilder.group( {
          title:[this.reviews_list[0].title, Validators.required],
          body: [this.reviews_list[0].body, Validators.required],
          rating: this.reviews_list[0].rating,
        })
      });
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

  isIncomplete() {
    return this.isInvalid('title') ||
      this.isInvalid('body')
  }

  isInvalid(control: any) {
    return this.editForm.controls[control].invalid &&
      this.editForm.controls[control].touched;
  }

  onDelete() {
    this.webService.deleteReview(
      this.route.snapshot.paramMap.get('id'))
      .subscribe( (response: any) => {
        this.modalService.close();
        this.router.navigate(['/reviews'])
      });
  }

  onEdit() {
    this.webService.editReview(
      this.route.snapshot.paramMap.get('id'),
      this.editForm.value)
      .subscribe( (response: any) => {
        this.modalService.close()
        this.review_loaded = false;
        this.webService.getReview(
          this.route.snapshot.paramMap.get('id'))
          .subscribe( (response: any) => {
            this.reviews_list = [response];
            this.review_loaded = true;
            this.processIfEdited()
          });
      });
  }
}
