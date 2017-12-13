/*
*Model：查询主模块的编辑视图模块
*Description：查询主模块的编辑视图模块
*Author:刘尚宇
*Finished：2017年10月10日
*/

import { Component } from "@angular/core";
import { baseInfoService } from "./baseInfo.service";
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
    selector: "testdetail",
    templateUrl: "./baseInfoDetail.component.html",
    //styleUrls: ["./baseInfoDetail.component.scss"]
})
export class baseInfoDetailComponent {
    private tempInput = [];
    constructor(
        private service: baseInfoService,
        public router: Router,
        private http: HttpClient,
    ) {
        this.init();
    }
    public init() {

    }
    public testclick(event): void {

    }
    private updateFactory(obj) {
        var body = "id=" + obj[0] + "&test=" + obj[1] + "&number=" + obj[2];
        this.http.post(
            //'/factoryInfo/updateFactory',
            '/dbmanage_war/factoryInfo/updateFactory',
            body,
            {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
            }
        ).subscribe(data => {
        });
    }

    public getInput(event, i) {
        this.tempInput[i] = event.target.value;
        console.log(event.target.value);
    }

    public save() {
        console.log(this.tempInput)
        for (var i = 0; i < this.tempInput.length; i++) {
            if (this.tempInput[i]) {
                this.service.baseInfoData[this.service.currentState['editTarget']]['data'][i] = this.tempInput[i];
            }
        }
        this.updateFactory(this.service.baseInfoData[this.service.currentState['editTarget']]['data']);
        this.router.navigate(["/baseInfo"]);
    }
    public cancel() {
        this.router.navigate(["/baseInfo"]);
    }

}