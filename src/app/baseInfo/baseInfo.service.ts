/*
*Model：服务模块，为查询的所有页面提供数据服务，为各个页面数据通信提供服务
*Description：查询主页面的入口模块
*Author:刘尚宇
*Finished：2017年10月10日
*/

import { Injectable, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class baseInfoService {
    private asyncSignal = new BehaviorSubject<number>(0);
    asyncStatus = this.asyncSignal.asObservable();
    public pageBar = {
        pageNum: 2,
        scale: 5,
        bottom: 0,
        top: 0,
        pages: [],
        chosenPage: 0,
    }
    public tabCard = "工厂查询";//选项卡:工厂查询，公司查询，地址查询
    public dataTab = {};//每个对象有三个内容,baseInfoTitle, baseInfoData, baseInfoVisibility
    public initialization = 0;
    public baseInfoTitle = [];//要和baseInfoData的data维度保持一致
    public baseInfoData: object[] = [];//数据结构
    public baseInfoVisibility = [];
    public currentState: object = {
        checkedTarget: [],//当前选中项目
        editTarget: -1,//当前编辑项目
        checkedAll: 0,//是否为全选状态

    }
    public validators = [
        Validators.required,
        Validators.email
    ];
    public errorMessages = {
        email: "非法的email格式",
        required: "该字段为必填字段"
    }

    public mockData(itemNumber): void {
        this.asyncSignal.next(100);
        this.baseInfoTitle = ["工厂名称", "工厂地址", "工厂类型", "新增条目"];
        this.baseInfoVisibility = [1, 1, 0, 1];
        this.baseInfoData = [];
        for (var i = 0; i < itemNumber; i++) {
            var obj = {
                checked: 0,
                visiable: 1,
                data: [],
            }
            obj.data = [
                "factoryname" + i,
                "testaddress" + i,
                "factoryscale" + i,
                "新增test" + i,
            ];
            this.baseInfoData.push(obj);
        }
        this.asyncSignal.next(200);
    }
    private initUIData(): void {
        var baseInfoDataLength = this.baseInfoData.length;
        this.currentState['checkedTarget'] = [];
        this.currentState['editTarget'] = 1;
    }
    constructor(
        private http: HttpClient,
    ) {

        this.mockData(30);
        this.initUIData();
    }

    //数据库方法
    private createBody(obj, dbTable) {
        var body = "";
        var splitSymbol = "";
        for (var i = 0; i < obj.length; i++) {
            if (i == 0) {
                splitSymbol = "";
            } else {
                splitSymbol = "&"
            }
            body = body + splitSymbol + this.baseInfoTitle[i] + "=" + obj[i];
        }
        body = body + "&=" + dbTable;
        return body;
    }

    private createUrl(dbTable) {
        var url = "/admin/bdFactoryInfo/getAll";
        //url = url + dbTable;
        return url;
    }

    public initBaseInfo(dbTable) {
        var url = this.createUrl(dbTable);
        this.asyncSignal.next(100);
        this.http.post(
            url,
            "table=" + dbTable,
            {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
            }
        ).subscribe(datas => {
            console.log("data has been recived");
            console.log(datas);
            this.baseInfoTitle = [];
            this.baseInfoData = [];
            this.baseInfoVisibility = [];

            for (var key in datas[0]) {//无论是否显示都塞入js代码中
                console.log("key:" + key);
                datas[0][key] = datas[0][key] - 0;
                this.baseInfoVisibility.push(datas[0][key]);//控制显示
                this.baseInfoTitle.push(key);
            }

            console.log(this.baseInfoVisibility);
            for (var i in datas) {
                var obj = {
                    checked: 0,
                    visiable: 1,
                    data: [],
                }
                for (var j in this.baseInfoTitle) {
                    obj.data.push(datas[i][this.baseInfoTitle[j]]);
                }
                this.baseInfoData.push(obj);
            }
            this.baseInfoData = this.baseInfoData.slice(1);
            this.asyncSignal.next(200);
            //this.service.baseInfoData.push();
        });
    }

    public addFactory(obj, dbTable) {
        // var body = "id=" + obj[0] + "&test=" + obj[1] + "&number=" + obj[2];
        // body = body + "&table=" + dbTable;
        var body = this.createBody(obj, dbTable);
        var url = this.createUrl(dbTable);
        this.http.post(
            //'/factoryInfo/addFactory',
            url,
            body,
            {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
            }
        ).subscribe(data => {
        });
    }

    public deleteFactory(factorylist, dbTable): void {
        var idlist = [];
        var url = this.createUrl(dbTable);
        for (var i = 0; i < factorylist.length; i++) {

            console.log(factorylist[i]);
            console.log(this.baseInfoData);
            idlist.push(this.baseInfoData[factorylist[i]]['data'][0]);
        }
        var body = "idlist=" + idlist + "&table=" + dbTable;
        this.http.post(
            url,
            body,
            {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
            }
        ).subscribe(data => {
        });
    }

    public updateFactory(obj, dbTable) {
        //var body = "id=" + obj[0] + "&test="+obj[1] + "&number=" + obj[2] + "&table=" + dbTable;
        var body = this.createBody(obj, dbTable);
        var url = this.createUrl(dbTable);
        this.http.post(
            url,
            body,
            {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
            }
        ).subscribe(data => {
        });
    }

}