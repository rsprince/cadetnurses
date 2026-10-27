import { Routes } from '@angular/router';
import { Research } from './research/research';
import { People } from './profiles/people';
import { Home } from './home/home';
import { About } from './about/about';
import { Resources } from './resources/resources';
import { History } from './history/history';
import { News } from './news/news';

export const routes: Routes = [
    // "loadComponent:" lazy-loads the standalone People component when the user visits /profiles.
    // The dynamic import keeps this component out of the initial JavaScript bundle.
    // When the route is activated, Angular imports the module, grabs the People export,
    // and displays it inside the active <router-outlet>.
    // "loadComponent:" is used for standalone components that are not included in the initial JavaScript bundle,
    // and for components that are lazy-loaded.
    // The part after the dot in the property below — .then((m) => m.People) — means this:
    // Angular calls import('./profiles/people') to lazy-load that module, then the .then() callback
    // receives the imported module object as m, and m.People picks out the standalone People component
    // so Angular can render it in the router outlet when this route is activated.
	{
		path: 'profiles',
		loadComponent: () => import('./profiles/people').then((m) => m.People),
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
	},
	{
		path: 'about',
		component: About,
	},
		{
		path: 'history',
		component: History,
	},
	{
		path: 'resources',
		component: Resources,
	},
	{
		path: 'news',
		component: News,
	},
		{
		path: 'research',
		component: Research,
	}
];
