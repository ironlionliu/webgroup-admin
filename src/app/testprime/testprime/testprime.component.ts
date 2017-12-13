import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import { ListboxModule} from 'primeng/primeng';
import { CheckboxModule} from 'primeng/primeng';
import { RadioButton } from 'primeng/primeng';
import { RadioButtonModule, ButtonModule } from 'primeng/primeng';
import { MenuModule, TabMenuModule, MenuItem} from 'primeng/primeng';




@Component({
  selector: 'app-testprime',
  templateUrl: './testprime.component.html',
  styleUrls: ['./testprime.component.css']
})
export class TestprimeComponent implements OnInit {
  
  items: MenuItem[];
  cities: SelectItem[];
  selectedCity: string;
  selectedValues: "nihaowa";
  constructor() {
      this.cities = [];
      this.cities.push({label:'New York', value:'New York'});
      this.cities.push({label:'Rome', value:'Rome'});
      this.cities.push({label:'London', value:'London'});
      this.cities.push({label:'Istanbul', value:'Istanbul'});
      this.cities.push({label:'Paris', value:'Paris'});
  }

  ngOnInit() {
    this.items = [];
    this.items = [
      {label: 'Stats', icon: 'fa-bar-chart'},
      {label: 'Calendar', icon: 'fa-calendar'},
      {label: 'Documentation', icon: 'fa-book'},
      {label: 'Support', icon: 'fa-support'},
      {label: 'Social', icon: 'fa-twitter'}
  ];


  }

}
