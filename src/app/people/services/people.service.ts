import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  url = 'data/content.json';
  data: any;

  constructor(private http: HttpClient) {}

  getAllStories() {
    this.data = this.http.get(this.url);
    console.log("Firing Service");
    return this.data;
  }

  getProfileByName(name: string) {
    this.data = this.http.get<any[]>(this.url)
    .pipe(
      map((records) => {
        const matches = records
          .filter((record) =>
            record?.type === 'people' &&
            record?.fieldLabels?.relationshipStatus === 'Cadet Nurse' &&
            record?.title?.toLowerCase().includes(name.toLowerCase())
          )
          .sort((a, b) => a.fieldLabels?.lastNameInNursingSchool?.localeCompare(b.fieldLabels?.lastNameInNursingSchool) || 0);

        return matches[0];
      })
    );
    return this.data;
  }

  // get all stories where type is 'people'
  getAllProfiles() {
    this.data = this.http.get<any[]>(this.url)
    /*
      pipe() chains RxJS operators, and map() transforms each emitted value.
      Here it maps the fetched array to a filtered array.
      record?.type means: if record is null/undefined, return undefined instead of throwing.
      Without ?. this could fail with "Cannot read properties of undefined".
    */
    .pipe(
      map((records) => 
        records.filter(
          (record) => 
            record?.type === 'people' && 
            record?.fieldLabels?.relationshipStatus === 'Cadet Nurse'
        )
        .sort((a, b) => a.fieldLabels?.lastNameInNursingSchool?.localeCompare(b.fieldLabels?.lastNameInNursingSchool) || 0)
      )
    );
    console.log("Firing Service");
    return this.data;
  }

  getFeaturedProfile() {
    this.data = this.http.get<any[]>(this.url)
    .pipe(
      map((records) => 
        {
          const matches = records.filter(
            (record) =>
              record?.type === 'people' &&
              record?.fieldLabels?.relationshipStatus === 'Cadet Nurse'
          );

          if (matches.length === 0) {
            return undefined;
          }
          /*
            This returns only one record because we calculate a single random index
            and return exactly one item: matches[randomIndex].
            Math.random() gives a decimal from 0 up to (but not including) 1.
            Example with 10 matches: Math.random() = 0.73 -> 0.73 * 10 = 7.3 -> Math.floor(...) = 7.
            So the function returns matches[7] (one randomly selected profile).
          */
          const randomIndex = Math.floor(Math.random() * matches.length);
          return matches[randomIndex];
        }
      )
    );
    return this.data;
  }
}
