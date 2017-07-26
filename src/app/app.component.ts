import { Component } from '@angular/core';
import { Router } from "@angular/router";

import './global-imports/rxjs-operators';

@Component({
	selector: 'countryinfo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private router: Router) {

	}
}
