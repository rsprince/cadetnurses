import { Routes } from '@angular/router';
import { People } from './people/people';
import { Home } from './home/home';

export const routes: Routes = [
    // "loadComponent:" lazy-loads the standalone People component when the user visits /people.
    // The dynamic import keeps this component out of the initial JavaScript bundle.
    // When the route is activated, Angular imports the module, grabs the People export,
    // and displays it inside the active <router-outlet>.
    // "loadComponent:" is used for standalone components that are not included in the initial JavaScript bundle,
    // and for components that are lazy-loaded.
	{
		path: 'people',
		loadComponent: () => import('./people/people').then((m) => m.People),
	},
    // Eagerly loads the Home component when the user visits /home.
    // The Home component is included in the initial JavaScript bundle, so it can be displayed immediately when the route is activated.
    // "component:" is used for components that are included in the initial JavaScript bundle, 
    // and for eagerly loaded components.
    {
		path: 'home',
		component: Home,
	},
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	}
];
