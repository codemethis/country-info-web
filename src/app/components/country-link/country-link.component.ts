import { Component, Input, OnInit } from '@angular/core';

import { Country } from '../../classes/country';
import { CountryService } from '../../services/country.service';

@Component({
	selector: 'countryinfo-country-link',
	templateUrl: './country-link.component.html'
})
export class CountryLinkComponent implements OnInit {
	@Input() countryId: string;
	protected country: Country;

	constructor(protected countryService: CountryService) {

	}

	ngOnInit() {
		this.countryService.getCountryByAlphaCode(this.countryId)
			.subscribe(c => this.country = c);
	}
}
