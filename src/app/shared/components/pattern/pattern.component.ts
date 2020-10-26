import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { BaseAbstract } from '@core/abstract/base.abstract';


@Component({
    selector: 'app-pattern',
    templateUrl: './pattern.component.html',
    styleUrls: ['./pattern.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatternComponent extends BaseAbstract implements OnInit, AfterViewInit {

    public currentTime: Date = new Date();

    @ViewChild('canvasRef')
    private canvasRef: ElementRef<HTMLCanvasElement>;
    private ctx: CanvasRenderingContext2D;
    private tile: HTMLCanvasElement;
    private tileCtx: CanvasRenderingContext2D;

    private PI_TWO: number = Math.PI * 2;
    private TO_DEG: number = 180 / Math.PI;
    private TO_RAD: number = Math.PI / 180;
    private tileSize: number = 128;
    // private random = new Random(Random.engines.mt19937().autoSeed());
    private colorsLovers = [];
    private colors = [];
    private num: number;
    private pr: number;
    private height: number;
    private width: number;


    constructor(
        public injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.init()
    }

    private init() {
        this.ctx = this.canvasRef.nativeElement.getContext('2d');

        this.tile = document.createElement('canvas');
        this.tileCtx = this.tile.getContext('2d');
    }

}
