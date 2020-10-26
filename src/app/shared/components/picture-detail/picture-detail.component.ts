import { Component, Injector, OnInit } from '@angular/core';
import { BaseAbstract } from '@core/abstract/base.abstract';
import { PictureService } from '@core/services/picture.service';
import { Picture, PictureState } from '@models';

@Component({
    selector: 'app-picture-detail',
    templateUrl: './picture-detail.component.html',
    styleUrls: ['./picture-detail.component.scss']
})
export class PictureDetailComponent extends BaseAbstract implements OnInit {

    public picture: Picture;
    public pictureData: any[];

    constructor(
        public injector: Injector,
        private pictureSrv: PictureService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.subs.pictureState = this.pictureSrv.$state.subscribe({
            next: (state: PictureState) => {
                this.picture = state.items[state.currentIndex];
                this.pictureData = this.parsePicture(this.picture);
            }
        });
    }

    public openImageWebsite(event: any): void {
        if (this.picture && this.picture.medias) {
            window.open(this.picture.medias.page, '_blank');
        }
        event.stopPropagation();
    }

    public downloadImage(event: any): void {
        if (this.picture && this.picture.medias) {
            const link = document.createElement('a');
            link.href = this.picture.medias.max;
            link.download = this.picture.title + '.jpg';
            link.rel = 'noopener noreferrer';
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        event.stopPropagation();
    }

    private parsePicture(picture: Picture) {
        const pictureData: any = [];

        if (!picture) {
            return pictureData;
        }

        if (picture.artiste) {
            pictureData.push({ label: 'Artist', data: picture.artiste });
        }

        if (picture.title) {
            pictureData.push({ label: 'Title', data: picture.title });
        }

        if (picture.subTitle) {
            pictureData.push({ label: 'SubTitle', data: picture.subTitle });
        }

        if (picture.date) {
            pictureData.push({ label: 'Date', data: picture.date });
        }

        if (picture.medium) {
            pictureData.push({ label: 'Medium', data: picture.medium });
        }

        if (picture.dimensions) {
            pictureData.push({ label: 'Dimensions', data: picture.dimensions });
        }

        if (picture.artisteBio) {
            pictureData.push({ label: 'Bio', data: picture.artisteBio });
        }

        if (picture.classification) {
            pictureData.push({ label: 'Classification', data: picture.classification });
        }

        if (picture.credits) {
            pictureData.push({ label: 'Credit', data: picture.credits });
        }

        return pictureData;
    }

}
