import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

import { Country } from "../../classes/country";
import { CountryService } from "../../services/country.service";

@Component({
	selector: 'countryinfo-search-result',
	templateUrl: './search-result.component.html'
})
export class SearchResultComponent {
	@Input() country: Country;
	
	constructor(private router: Router, private countryService: CountryService) {
		
	}
	
	go() {
		this.router.navigate(['/show', this.country.alpha2Code.toLowerCase()]);
	}
}
