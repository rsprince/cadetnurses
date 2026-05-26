import { Component } from '@angular/core';
import { PeopleService } from './services/people.service';

@Component({
  selector: 'app-people',
  imports: [],
  templateUrl: './people.html',
  styleUrl: './people.scss',
})
export class People {

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.peopleService.getPeople().subscribe((data: any) => {
      console.log(data);
    });
  }
}
