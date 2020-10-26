import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { BaseAbstract } from '@core/abstract/base.abstract';
import { interval } from 'rxjs';

@Component({
    selector: 'app-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockComponent extends BaseAbstract implements OnInit {

    public currentTime: Date = new Date();

    constructor(
        public injector: Injector,
        private cdRef: ChangeDetectorRef) {
        super(injector);
    }

    ngOnInit(): void {
        this.subs.clock = interval(1000).subscribe({
            next: () => {
                this.currentTime = new Date();
                this.cdRef.detectChanges();
            }
        });
    }
}
