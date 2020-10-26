import { Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseAbstract } from '@core/abstract/base.abstract';
import { PictureService } from '@core/services/picture.service';
import { Picture, PictureState } from '@models';
import Zooming from 'zooming';

@Component({
    selector: 'app-picture-viewer',
    templateUrl: './picture-viewer.component.html',
    styleUrls: ['./picture-viewer.component.scss']
})
export class PictureViewerComponent extends BaseAbstract implements OnInit, OnDestroy {

    public picture: Picture;
    private zooming: Zooming;

    constructor(
        public injector: Injector,
        private pictureSrv: PictureService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.pictureSrv.$state.subscribe({
            next: (pictureState: PictureState) => {
                console.log(pictureState);
                this.picture = pictureState.items[pictureState.currentIndex];
            }
        });
        this.initZooming();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.destroyZooming();
    }

    public onImageLoad(event: any): void {
        if (this.zooming && event && event.target) {
            this.zooming.listen(event.target);
        }
    }

    public onImageError(event: any): void {
        this.picture = null;
    }

    private initZooming(): void {
        this.zooming = new Zooming({
            bgColor: 'var(--bgColorPanel)',
            scaleBase: 0.9,
            scaleExtra: 2
        });
    }

    private destroyZooming(): void {
        if (this.zooming) {
            this.zooming = null;
        }
    }
}
