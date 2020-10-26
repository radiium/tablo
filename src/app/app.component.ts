import { Component, Injector } from '@angular/core';
import { SettingsService } from '@core/services/settings.service';
import { SettingsState } from '@models';
import { BaseAbstract } from '@core/abstract/base.abstract';
import { PictureService } from '@core/services/picture.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseAbstract {
    public loading = true;

    constructor(
        public injector: Injector,
        private settingsSrv: SettingsService,
        private pictureSrv: PictureService
    ) {
        super(injector);
        this.initApp();
    }

    private initApp(): void {
        this.subs.loading = this.loadingService.$state.subscribe((state: boolean) => {
            this.loading = state;
        });

        this.loadingService.show();
        Promise.all([
            this.settingsSrv.init(),
            this.pictureSrv.init()
        ])
        .then((result: any[]) => {
            this.pictureSrv.getRandomPicture().subscribe({
                next: () => {
                    this.loadingService.hide();
                },
                error: (err: any) => {
                    console.error(err);
                    this.loadingService.hide();
                }
            });
        });
    }
}
