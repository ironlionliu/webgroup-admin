import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListboxModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RadioButtonModule, RadioButton, ButtonModule } from 'primeng/primeng';

import { TestprimeComponent } from './testprime/testprime.component';
import { MenuModule, TabMenuModule, MenuItem } from 'primeng/primeng';


@NgModule({
  imports: [
    CommonModule,
    ListboxModule,
    CheckboxModule,
    ListboxModule,
    FormsModule,
    RadioButtonModule,
    ButtonModule,
    MenuModule,
    TabMenuModule, 

  ],
  declarations: [TestprimeComponent]
})
export class TestprimeModule { }
