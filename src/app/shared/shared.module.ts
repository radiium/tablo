import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';

import { IconsModule } from './icons/icons.module';
import { COMPONENTS } from './components';
import { DIRECTIVES } from './directives';
import { PIPES } from './pipes';

@NgModule({
    declarations: [
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        SidebarModule,
        DialogModule,
        IconsModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        SidebarModule,
        DialogModule,
        IconsModule,
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES
    ]
})
export class SharedModule { }
