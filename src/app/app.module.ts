import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CountryService } from './services/country.service';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchComponent } from './components/search/search.component';
import { CountryLinkComponent } from './components/country-link/country-link.component';
import { CountryInfoComponent } from './components/country-info/country-info.component';

const appRoutes: Routes = [
	{ path: '', component: SearchComponent, pathMatch: 'full' },
	{ path: 'show/:countryId', component: CountryInfoComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		SearchResultComponent,
		SearchComponent,
		CountryLinkComponent,
		CountryInfoComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot(appRoutes, {useHash: true})
	],
	providers: [CountryService],
	bootstrap: [AppComponent]
})
export class AppModule { }
