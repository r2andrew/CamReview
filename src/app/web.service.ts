import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class WebService{
  pageSize: number = 3;
  constructor(private http: HttpClient) { }
  getReviews(page: number) {
    return this.http.get<any>(
      "https://prod-23.spaincentral.logic.azure.com/workflows/76e4836b5f524055bbadd68e95f9111d/triggers/" +
      "When_a_HTTP_request_is_received/paths/invoke/v1/reviews" +
      "?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun" +
      "&sv=1.0&sig=nZ0SSE4OTZ0YD2tBKkzUNVOz6_-sIjy3cwfpjVPljz0");
  }
  getReview(id: any) {
    return this.http.get<any>(
      'https://prod-05.spaincentral.logic.azure.com/workflows/45ea2b9ac44448a3bf2a08fe6d1a43d7/triggers' +
      '/When_a_HTTP_request_is_received/paths/invoke/v1/reviews/' + id +
      '?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun' +
      '&sv=1.0&sig=LhKQ7GVcaa5tAalizPfSkIBU4-JkGVCa6rHzeAaebZg');
  }
  postReview(review: any, file: any) {
    let postData = new FormData();
    postData.append("username", review.username);
    postData.append("title", review.title);
    postData.append("body", review.body);
    postData.append("rating", review.rating);
    postData.append("file", file, file.name);
    return this.http.post<any>(
      'https://prod-15.spaincentral.logic.azure.com/workflows/d80eff7c00bc42be955ae8a8b770d975/triggers/' +
      'When_a_HTTP_request_is_received/paths/invoke/v1/reviews' +
      '?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun' +
      '&sv=1.0&sig=E-yNNxalDA0z3BQfzqoN62RzVVMRWqivct1W9jXo0oc', postData);
  }
  deleteReview(id: any) {
    return this.http.delete<any>(
      'https://prod-21.spaincentral.logic.azure.com/workflows/3ef516265acd4492af51ee8bec841d28/triggers/' +
      'When_a_HTTP_request_is_received/paths/invoke/v1/reviews/' + id +
      '?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun' +
      '&sv=1.0&sig=ScYEs_rJ-WNEIGuIY4zpZJ1ax_2-JFZ0LlxGekkmgGc');
  }

  editReview(id: any, review:any) {
    let putData = new FormData();
    putData.append("title", review.title);
    putData.append("body", review.body);
    putData.append("rating", review.rating);
    return this.http.put<any>(
      'https://prod-18.spaincentral.logic.azure.com/workflows/6dce5f7f7a0d48deb21d1d44661ca61b/triggers/' +
      'When_a_HTTP_request_is_received/paths/invoke/v1/reviews/' + id +
      '?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun' +
      '&sv=1.0&sig=DKCWm4CbOcnMwKmZrTylhRXRWMO7M19ol14ERb3gTgk', putData);
  }
}
