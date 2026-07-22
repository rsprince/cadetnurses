import { Component, signal } from '@angular/core';
import { ResourcesService } from './resources.service';

@Component({
  selector: 'app-resources',
  imports: [],
  templateUrl: './resources.html',
  styleUrl: './resources.scss',
})
export class Resources {
  resources = signal<any[]>([]);

   constructor(private resourcesService: ResourcesService) {}

  ngOnInit() {
    this.getResources();
  }

  getResources() {
    this.resourcesService.getAllResources().subscribe({
      next: (data: any[]) => {
        console.log("Subscribed data:", data);
        this.resources.set(data);
      },
      error: (err: any) => {
        console.error("Resources Service Error:", err);
      },
      complete: () => {
        console.log("Resources Service Complete");
      }
    });
  } 
}
