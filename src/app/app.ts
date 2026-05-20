/*
  These imports bring classes and directives into the current file's scope, 
  allowing us to use them in this Typescript file.
*/
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  // The `imports` array specifies the directives that are used in the component's template.
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // The `title` property is a signal that holds the string 'cadetNurses'.
  // A signal is a reactive primitive that allows the component to react to changes in its value.
  protected readonly title = signal('cadetNurses');
}
