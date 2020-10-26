import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output } from '@angular/core';
import { BaseAbstract } from '@core/abstract/base.abstract';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})
export class ImageComponent extends BaseAbstract implements OnInit, OnChanges {

    @Input()
    public src: string;

    @Input()
    public alt: string;

    @Output()
    public imageLoaded: EventEmitter<any> = new EventEmitter();

    @Output()
    public imageError: EventEmitter<any> = new EventEmitter();

    public isLoaded: boolean = true;

    constructor(public injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
    }

    ngOnChanges(): void {
        this.isLoaded = false;
    }

    public onImageLoad(event: any): void {
        this.isLoaded = true;
        this.imageLoaded.emit(event);
    }

    public onImageError(event: any): void {
        this.isLoaded = true;
        this.imageError.emit(event);
    }
}
