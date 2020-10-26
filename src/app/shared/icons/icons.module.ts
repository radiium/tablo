import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { Home, Settings, RefreshCcw, Star, Grid,
    AlertCircle, ExternalLink, Download } from 'angular-feather/icons';

const icons = {
    Home,
    Settings,
    RefreshCcw,
    Star,
    Grid,
    AlertCircle,
    ExternalLink,
    Download
};

@NgModule({
    imports: [
        FeatherModule.pick(icons)
    ],
    exports: [
        FeatherModule
    ]
})
export class IconsModule { }
