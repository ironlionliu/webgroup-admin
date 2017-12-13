/*
*Model：查询主模块
*Description：查询主页面的入口模块
*Author:刘尚宇
*Finished：2017年10月10日
*/

import { NgModule } from "@angular/core"
import { RouterModule, Routes, Router} from '@angular/router'
import { CommonModule } from '@angular/common';
import { baseInfoComponent } from "./baseInfo.component"
import { baseInfoDetailComponent } from "./baseInfoDetail.component"
import { baseInfoAddComponent } from "./baseInfoAdd.component"
import { baseInfoService } from "./baseInfo.service"
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MenuModule, TabMenuModule, MenuItem } from 'primeng/primeng';

const baseInfoRoutes: Routes = [
    //{path: "", redirectTo: '/baseInfo', pathMatch: 'full'},
    // {path: "baseInfo", component: baseInfoComponent},
    // {path: "baseInfoDetail", component: baseInfoDetailComponent},
    // {path: "baseInfoAdd", component: baseInfoAddComponent}
    {
        path: "baseInfo", 
        component: baseInfoComponent,
        children: [
            {
                path: '',
                component: baseInfoComponent,
                //component: baseInfoDetailComponent,
                children: [
                    {
                    path: 'baseInfoDetail',
                    component: baseInfoDetailComponent
                    },
                ]
            }
            // {path: '', component: baseInfoAddComponent},
            // {path: "baseInfoDetail", component: baseInfoDetailComponent}
        ]
    },
    
]
@NgModule({
    declarations: [
        baseInfoComponent,
        baseInfoDetailComponent,
        baseInfoAddComponent,
    ],
    imports: [
        RouterModule.forChild(
            baseInfoRoutes
        ),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MenuModule,
        TabMenuModule, 
    ],
    exports: [
        RouterModule
      ],
    providers: [baseInfoService]
})
export class baseInfoModule{

}