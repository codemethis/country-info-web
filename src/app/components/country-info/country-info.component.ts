import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Country } from '../../classes/country';
import { CountryService } from '../../services/country.service';

import { WorldLanguage, worldLanguages } from '../../classes/world-language';

@Component({
	selector: 'countryinfo-country-info',
	templateUrl: './country-info.component.html'
})
export class CountryInfoComponent implements OnInit {
	countryId: string;
	showMap = false;
	public country: Country;
	private borders: any[];

	constructor(
		private sanitizer: DomSanitizer,
		private countryService: CountryService,
		private router: Router,
		private route: ActivatedRoute
	) {

	}

	ngOnInit() {
		this.route.params.pipe(
			map(p => p['countryId']),
			switchMap(id => this.countryService.getCountryByAlphaCode(id))
		).subscribe(c => this.country = c);
	}

	getUrl(): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl(
			`http://wikimapia.org/#lang=en&lat=${this.country.latlng[0]}&lon=${this.country.latlng[1]}&z=4&m=h`
		);
	}

	getFilteredLanguageList(): WorldLanguage[] {
		return worldLanguages.filter(lang => this.country.translations[lang.code]);
	}

	getLanguageFromCode(code: string) {
		const lang: WorldLanguage = worldLanguages.find(l => l.code === code);

		return lang ? lang.name : '';
	}

	returnToSearch() {
		this.router.navigate(['']);
	}

	toggleMap() {
		this.showMap = !this.showMap;
	}

	// private handleError(error: any): Promise<any> {
	// 	console.error('An error occured', error);
	// 	return Promise.reject(error.message || error);
	// }

}
