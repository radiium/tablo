import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Picture, PictureState } from '@models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractStore } from '@core/abstract/store.abstract';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class PictureService extends AbstractStore<PictureState> {

    private readonly TOTAL_FILES = 126980;
    protected readonly STORAGE_KEY: string = 'picture';
    protected readonly DEFAULT_STATE: PictureState = {
        currentIndex: null,
        items: []
    };

    constructor(
        public injector: Injector,
        private http: HttpClient
    ) {
        super(injector);
    }

    public async init(): Promise<PictureState> {
        return super.init().then((state: PictureState) => {
            this.setState(state);
            return state;
        });
    }

    public getRandomPicture(): Observable<Picture> {
        const index = this.getRandomInt(0, this.TOTAL_FILES);
        return this.getPicture(index);
    }

    private getPicture(index: number): Observable<Picture> {
        const url = `assets/data/${index}.json`;
        return this.http.get(url).pipe(
            map((picture: Picture) => {
                this.addItem(picture);
                return picture;
            })
        );
    }

    private getRandomInt(min: number, max: number): number {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }

    private addItem(item: Picture): void {
        const state = this.getState();
        state.items.unshift(item);
        state.currentIndex = 0;
        this.setState(state);
    }

    public setCurrentIndex(index: number): void {
        const state = this.getState();
        state.currentIndex = index;
        this.setState(state);
    }
}
