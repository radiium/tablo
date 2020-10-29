import { Component, Injector, Input, OnInit } from '@angular/core';
import { BaseAbstract } from '@core/abstract/base.abstract';
import { PictureService } from '@core/services/picture.service';
import { Picture, PictureState } from '@models';

@Component({
    selector: 'app-picture-historic',
    templateUrl: './picture-historic.component.html',
    styleUrls: ['./picture-historic.component.scss']
})
export class PictureHistoricComponent extends BaseAbstract implements OnInit {

    public pictureState: PictureState;

    constructor(
        public injector: Injector,
        private pictureSrv: PictureService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.subs.pictureState = this.pictureSrv.$state.subscribe({
            next: (state: PictureState) => {
                if (state) {
                    this.pictureState = state;
                }
            }
        });
    }

    public selectPicture(index: number) {
        this.pictureSrv.setCurrentIndex(index);
    }
}
