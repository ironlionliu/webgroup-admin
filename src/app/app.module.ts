/*
*Model：主模块
*Description：项目入口模块
*Author:刘尚宇
*Finished：2017年10月10日
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router'
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms"
import { ListboxModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { baseInfoModule } from './baseInfo/baseInfo.module';
import { TestprimeModule } from './testprime/testprime.module';
import { appRoutes } from './app.routes';
import { baseInfoComponent } from './baseInfo/baseInfo.component';
import { baseInfoDetailComponent } from './baseInfo/baseInfoDetail.component';
import { baseInfoAddComponent } from './baseInfo/baseInfoAdd.component';
import { TestprimeComponent } from './testprime/testprime/testprime.component';



const baseInfoRoutes: Routes = [
  { path: "", redirectTo: '/baseInfo', pathMatch: 'full' },
  { path: "baseInfo", component: baseInfoComponent },
  { path: "baseInfoDetail", component: baseInfoDetailComponent },
  { path: "baseInfoAdd", component: baseInfoAddComponent },
  { path: "testprime", component: TestprimeComponent },

  // {
  //     path: "baseInfo", 
  //     component: baseInfoComponent,
  //     children: [
  //         {
  //             path: '',
  //             component: baseInfoComponent,
  //             children: [
  //                 {
  //                 path: 'baseInfoDetail',
  //                 component: baseInfoDetailComponent
  //                 },
  //             ]
  //         }
  //         //{path: '', component: baseInfoComponent},
  //         //{path: "baseInfoDetail", component: baseInfoDetailComponent}
  //     ]
  // },
  // {
  //   path: "baseInfo",
  //   loadChildren: "./baseInfo/baseInfo.module"
  // }

]


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(
      baseInfoRoutes
    ),
    baseInfoModule,
    TestprimeModule,
    BrowserModule,
    FormsModule,
    ListboxModule,
    CheckboxModule,
    ListboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
  }
}
