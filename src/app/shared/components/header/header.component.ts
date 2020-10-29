import { ChangeDetectorRef, Component, Injector, NgZone, OnInit } from '@angular/core';
import { BaseAbstract } from '@core/abstract/base.abstract';
import { PictureService } from '@core/services/picture.service';
import { PictureState } from '@models';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseAbstract implements OnInit {

    public pictureState: PictureState;
    public showPictureDetail: boolean = false;
    public showPictureHistoric: boolean = false;
    public showSettings: boolean = false;

    constructor(
        public injector: Injector,
        private pictureSrv: PictureService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.pictureSrv.$state.subscribe({
            next: (state: PictureState) => {
                if (state) {
                    this.pictureState = state;
                }
            }
        });
    }

    public getRandomPicture(): void {
        this.loadingService.show();
        this.pictureSrv.getRandomPicture().subscribe({
            next: () => {
                this.loadingService.hide();
            },
            error: (err: any) => {
                console.error(err);
                this.loadingService.hide();
            }
        });
    }

    public openPictureDetail(): void {
        this.showPictureDetail = true;
    }

    public openPictureHistoric(): void {
        this.showPictureHistoric = true;
    }

    public openSettings(): void {
        this.showSettings = true;
    }
}
