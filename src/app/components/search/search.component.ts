import { Component } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { Country } from "../../classes/country";
import { CountryService } from "../../services/country.service";

@Component({
	selector: 'countryinfo-search',
	templateUrl: './search.component.html'
})
export class SearchComponent {
	results: Country[] = [];
	currentSearchValue: string;
	searches: Observable<string>;

	private searchStream = new Subject<string>();
	
	constructor(private countryService: CountryService) {
		this.searchStream.debounceTime(500)
			.distinctUntilChanged()
			.switchMap((s: string) => this.countryService.getCountriesByName(s))
			.subscribe(o => this.results = o);
	}
	
	runSearch(input: string) {
		this.searchStream.next(input);
	}

	trackByAlpha2Code(index: number, c: Country): string {
		return c.alpha2Code;
	}
}
