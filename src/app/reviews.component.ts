import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'reviews',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  reviews_list = [
    {
      "id": "JTJmY3JtZWRpYXN0b3JlJTJmNjM4NjgyMzA5MzEzNzE4NDE4LmpwZWc=",
      "filePath": "/crmediastore/638682309313718418.jpeg",
      "fileLocator": "JTJmY3JtZWRpYXN0b3JlJTJmNjM4NjgyMzA5MzEzNzE4NDE4LmpwZWc=",
      "username": "2",
      "title": "TitlleText",
      "body": "BodyText",
      "rating": 3,
      "createdTime": "2024-11-26T15:15:31.7712267Z",
      "modifiedTime": "2024-11-26T15:15:31.7712267Z",
      "_rid": "t8shAIVgz7gJAAAAAAAAAA==",
      "_self": "dbs/t8shAA==/colls/t8shAIVgz7g=/docs/t8shAIVgz7gJAAAAAAAAAA==/",
      "_etag": "\"00007a2f-0000-0300-0000-6745e6140000\"",
      "_attachments": "attachments/",
      "_ts": 1732634132
    },
    {
      "id": "JTJmY3JtZWRpYXN0b3JlJTJmNjM4NjgyMzEyNDY0NTM2MTk4LmpwZWc=",
      "filePath": "/crmediastore/638682312464536198.jpeg",
      "fileLocator": "JTJmY3JtZWRpYXN0b3JlJTJmNjM4NjgyMzEyNDY0NTM2MTk4LmpwZWc=",
      "username": "r2",
      "title": "title",
      "body": "body",
      "rating": 2,
      "createdTime": "2024-11-26T15:20:46.9277577Z",
      "modifiedTime": "2024-11-26T15:20:46.9277577Z",
      "_rid": "t8shAIVgz7gKAAAAAAAAAA==",
      "_self": "dbs/t8shAA==/colls/t8shAIVgz7g=/docs/t8shAIVgz7gKAAAAAAAAAA==/",
      "_etag": "\"00002330-0000-0300-0000-6745e74f0000\"",
      "_attachments": "attachments/",
      "_ts": 1732634447
    }
  ]

}
