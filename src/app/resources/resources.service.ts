import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  url = 'data/content.json';
  data: any;

  constructor(private http: HttpClient) {}

  getAllResources() {
    this.data = this.http.get<any[]>(this.url)
		.pipe(
			map((records) => 
				records.filter(
					(record) => 
						record?.type === 'online_resources'
				)
				.sort((a, b) => a.fieldLabels?.lastNameInNursingSchool?.localeCompare(b.fieldLabels?.lastNameInNursingSchool) || 0)
			)
		);
		console.log("Firing Service");
		return this.data;

  }

}
