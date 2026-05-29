import { Component, signal } from '@angular/core';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  aboutStory = signal<any>(null);
  
  constructor(private aboutService: AboutService) {}

  ngOnInit() {  
    /*
      getOneStory now returns one object (or undefined), not an array.
      We store that single story in a signal for template rendering.
    */
    this.aboutService.getOneStory(1).subscribe({
      next: (data: any[]) => {
        this.aboutStory.set(data);
        console.log("About Component - Subscribed data:", data);
      },
      error: (err: any) => {
        console.error("About Component - People Service Error:", err);
      }, 
      complete: () => {
      console.log("People Service Complete");
    }
    });
  }


}
