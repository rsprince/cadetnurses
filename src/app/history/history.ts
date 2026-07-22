import { Component, signal } from '@angular/core';
import { HistoryService } from './history.service';

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History {
  historyStory = signal<any>(null);

  constructor(private historyService: HistoryService) {}

  ngOnInit() {  
    /*
      getOneStory returns one object (or undefined), not an array.
      We store that single story in a signal for template rendering.
    */
    this.historyService.getOneStory(4).subscribe({
      next: (data: any) => {
        this.historyStory.set(data);
        console.log("History Component - Subscribed data:", data);
      },
      error: (err: any) => {
        console.error("History Component - History Service Error:", err);
      }, 
      complete: () => {
        console.log("History Service Complete");
      }
    });
  }
}

