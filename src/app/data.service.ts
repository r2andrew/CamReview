import jsonData from '../assets/reviews.json'
export class DataService {
  pageSize: number = 1;
  getReviews(page: number) {
    let pageStart = (page - 1) * this.pageSize;
    let pageEnd = pageStart + this.pageSize;
    return jsonData.slice(pageStart, pageEnd);
  }
  getReview(id: any) {
    let dataToReturn: any[] = [];
    jsonData.forEach( function(review) {
      if (review['id'] == id) {
        dataToReturn.push( review );
      }
    })
    return dataToReturn;
  }
  getLastPageNumber() {
    return Math.ceil( jsonData.length / this.pageSize );
  }
}
