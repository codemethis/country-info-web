import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, empty, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Country } from '../classes/country';

@Injectable()
export class CountryService {
	private apiUrl = 'https://restcountries.eu/rest/v1/';

	constructor(private http: HttpClient) {

	}

	getCountryByAlphaCode(code: string): Observable<Country> {
		if (code === undefined) {
			console.log('Search called with undefined search string');
			return empty();
		}

		if (code.length === 0) {
			return empty();
		}

		return this.http.get<Country>(`${this.apiUrl}alpha/${code}`)
			.pipe(
				catchError(this.getNullObs)
			);
	}

	getCountriesByName(input: string): Observable<Country[]> {
		if (input === undefined) {
			console.log('Search called with undefined search string');
			return of([]);
		}

		if (input.length === 0) {
			return of([]);
		}

		return this.http.get<Country[]>(`${this.apiUrl}name/${input}`)
			.pipe(
				catchError(this.handleError)
			);
	}

	getFlagPath(country: Country) {
		return `assets/Flags/${country.alpha2Code.toLowerCase()}.png`;
	}

	private handleError(error: any): Observable<Country[]> {
		let errMsg: string;
		if (error instanceof HttpErrorResponse) {
			errMsg = `${error.status} - ${error.statusText || ''}`;
		} else {
			errMsg = error.message ? error.messge : error.toString();
		}

		console.error(errMsg);
		return of([]);
	}

	private getNullObs(error: Response | any): Observable<Country> {
		return of(null);
	}
}
