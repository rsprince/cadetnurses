import { Component, computed, signal } from '@angular/core';
import { PeopleService } from './services/people.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-people',
  imports: [MatTabsModule, MatPaginatorModule /* JsonPipe,*/  ],
  templateUrl: './people.html',
  styleUrl: './people.scss'
})
export class People {
  // cadetNurses is a signal that holds an array of any type, initialized as an empty array.
  cadetNurses = signal<any[]>([]);
  featuredProfile = signal<any>(null);
  pageIndex = signal(0);
  pageSize = signal(5);
  pagedCadetNurses = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();

    return this.cadetNurses().slice(startIndex, endIndex);
  });

  constructor(private peopleService: PeopleService) {}

ngOnInit() {

  this.peopleService.getAllProfiles()
  .subscribe({
    next: (data: any[]) => {
      console.log("Subscribed data:", data);
      // Update the cadetNurses signal with the fetched data, 
      // using nullish coalescing to ensure it defaults to an empty array if data is null 
      // or undefined.
      this.cadetNurses.set(data ?? []);
      this.pageIndex.set(0);
      console.log("cadetNurses after assignment:", this.cadetNurses());
    },

    error: (err: any) => {
      console.error("People Service Error:", err);
    },

    complete: () => {
      console.log("People Service Complete");
    }

  });

  this.peopleService.getFeaturedProfile()
  .subscribe({
    next: (data: any) => {
      console.log("Featured Profile:", data);
      this.featuredProfile.set(data ?? null);
    },
    error: (err: any) => {
      console.error("Error fetching featured profile:", err);
    },
    complete: () => {
      console.log("Completed fetching featured profile");
    }
  });

}

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
