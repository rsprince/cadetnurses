import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  url = 'data/content.json';
  data: any;
  
  constructor(private http: HttpClient) {}

    getOneStory(id: number) {
      this.data = this.http.get<any[]>(this.url)
      .pipe(
        /*
          find(...) returns one matching story object instead of an array.
          This matches About page bindings like story.title and story.bodyHtml.
        */
        map((records) => 
          records.find(
            (record) => 
              record?.nid === id
          )
        )
      );
  
      return this.data;
    }
}
