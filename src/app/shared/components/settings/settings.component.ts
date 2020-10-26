import { Component, Injector, OnInit } from '@angular/core';
import { BaseAbstract } from '@core/abstract/base.abstract';
import { SettingsService } from '@core/services/settings.service';
import { SettingsState, ThemeType } from '@models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseAbstract implements OnInit {

    public settings: SettingsState;
    public themeType: typeof ThemeType = ThemeType;

    constructor(
        public injector: Injector,
        private settingsService: SettingsService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.subs.settings = this.settingsService.$state.subscribe({
            next: (settings: SettingsState) => {
                this.settings = settings;
            }
        });
    }

    public selectTheme(theme: ThemeType): void {
        this.settingsService.setTheme(theme);
    }
}
