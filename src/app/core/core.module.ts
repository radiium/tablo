import { NgModule } from '@angular/core';
import { registerLocaleData, TitleCasePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { BrowserAPIService } from './browser-api/browser-api.service';
import { BrowserAPIFactory } from './browser-api/browser-api.factory';
import { LoadingService } from './services/loading.service';
import { SettingsService } from './services/settings.service';
import { PictureService } from './services/picture.service';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';

registerLocaleData(localeFr);

@NgModule({
    providers: [
        {
            provide: BrowserAPIService,
            useFactory: BrowserAPIFactory,
        },
        {
            provide: LOCALE_ID,
            useValue: 'fr-FR'
        },
        {
            provide: RouteReuseStrategy,
            useClass: CustomRouteReuseStrategy
        },
        TitleCasePipe,
        LoadingService,
        SettingsService,
        PictureService
    ],
})
export class CoreModule { }
