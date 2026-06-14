import { Component, computed, signal } from '@angular/core';
import { PeopleService } from './services/people.service';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
// import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-people',
  imports: [MatTabsModule, MatPaginatorModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule /* JsonPipe,*/  ],
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

	searchMode: string = 'search';
  FormData!: FormGroup;
  searchedProfile = signal<any>(null);

  constructor(
		private peopleService: PeopleService,
	  private formBuilder: FormBuilder
	) {}

ngOnInit() {
	this.getAllProfiles();
	this.getFeaturedProfile();
	this.prepareForm();
}

  getAllProfiles() {
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
  }

  getFeaturedProfile() {
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

	prepareForm() {
    this.FormData = this.formBuilder.group({
      Name: new FormControl('', [Validators.required])
    });
  }

  resetSearchMode() {
		this.searchMode = 'search';
		this.searchedProfile.set(null);
		this.FormData?.reset({ Name: '' });
  }

  onSubmit(formData: unknown) {
    console.log('Submitted form data:', formData);
		this.getProfileByName(this.FormData.value.Name);
  }

	getProfileByName(name: string) {
		this.searchMode = 'results';
		this.peopleService.getProfileByName(name)
		.subscribe({
      next: (data: any) => {
				console.log("Search results for", name, ":", data);
        this.searchedProfile.set(data ?? null);
			},
			error: (err: any) => {
				console.error("Error searching profiles:", err);
			},
			complete: () => {
				console.log("Completed profile search");
			}
		});
	}

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  onTabChange(event: MatTabChangeEvent) {
	if (event.index === 2) {
    this.resetSearchMode();
	}
  }
}
