/*
*Model：查询主模块的视图组建
*Description：查询主页面的入口视图
*Author:刘尚宇
*Finished：2017年10月10日
*/


import { Component } from "@angular/core"
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { baseInfoService } from "./baseInfo.service";
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';



@Component({
    //selector: "router-outlet",
    templateUrl: "./baseInfo.component.html",
    styleUrls: ["./baseInfo.component.scss"]
})

//查询内容区组建
export class baseInfoComponent {
    subscription: Subscription;
    private searchValue = "请输入搜索内容";

    public checkAll(): void {
        var baseInfoDataLength = this.service.baseInfoData.length;
        this.service.currentState["checkedAll"] = 1 - this.service.currentState["checkedAll"];
        for (var i = 0; i < baseInfoDataLength; i++) {
            this.service.baseInfoData[i]['checked'] = this.service.currentState["checkedAll"];
        }
        this.service.currentState['checkedTarget'] = [];
        for (var i = 0; i < this.service.baseInfoData.length; i++) {
            if (this.service.baseInfoData[i]['checked'] == 1) {
                this.service.currentState['checkedTarget'].push(i);
            }
        }
        console.log("被选中的有：" + this.service.currentState['checkedTarget']);
        console.log("checkedall:" + this.service.currentState['checkedAll'])
    }

    public checkOne(baseInfoData, index): void {
        this.service.baseInfoData[index]["checked"] = 1 - this.service.baseInfoData[index]["checked"];
        //baseInfoData["checked"] = 1 - baseInfoData["checked"];
        console.log("ckecked is " + baseInfoData["checked"]);
        this.service.currentState['checkedTarget'] = [];
        for (var i = 0; i < this.service.baseInfoData.length; i++) {
            //这样就保证了塞进去的顺序是从小到大的
            if (this.service.baseInfoData[i]['checked'] == 1) {
                this.service.currentState['checkedTarget'].push(i);
            }
        }
        console.log("被选中的有：" + this.service.currentState['checkedTarget']);
    }

    //增删改
    public add(): void {
        this.service.currentState["editTarget"] = -1;
        this.router.navigate(["/baseInfoAdd"]);
    }
    public edit(baseInfoData, index): void {
        this.service.currentState["editTarget"] = index;
        console.log(this.service.currentState["editTarget"]);
        console.log(this.service.baseInfoData[this.service.currentState['editTarget']]['data']);
        //this.router.navigate(["/baseInfoDetail"]);
        this.router.navigate(["/baseInfoAdd"]);
    }
    public delete(): void {
        //this.service.currentState["checkedTarget"].sort()//本身排好序了，这句不需要了
        console.log("将要删掉的条目有：" + this.service.currentState["checkedTarget"]);
        this.service.deleteFactory(this.service.currentState["checkedTarget"], this.service.tabCard);
        for (var i = this.service.currentState["checkedTarget"].length - 1; i >= 0; i--) {
            var index = this.service.currentState["checkedTarget"][i];
            this.service.baseInfoData.splice(index, 1);
        }
        this.service.currentState["checkedTarget"] = [];
    }

    //重新渲染数据
    private changeData(e) {
        if (/<li.*/.test(e.target.innerHTML) == true) {
        } else {
            var obj = {};
            obj["baseInfoData"] = this.service.baseInfoData;
            obj["baseInfoTitle"] = this.service.baseInfoTitle;
            obj["baseInfoVisibility"] = this.service.baseInfoVisibility;
            this.service.dataTab[this.service.tabCard] = obj;
            this.service.tabCard = e.target.innerHTML;
            if (this.service.dataTab[this.service.tabCard]) {
                this.service.baseInfoData = this.service.dataTab[this.service.tabCard]["baseInfoData"];
                this.service.baseInfoTitle = this.service.dataTab[this.service.tabCard]["baseInfoTitle"];
                this.service.baseInfoVisibility = this.service.dataTab[this.service.tabCard]["baseInfoVisibility"];
            } else {
                this.service.mockData(9);
            }

        }
        this.initPageBar();
        this.switchPage(1);
    }
    private searchFocus() {
        this.searchValue = "";
    }
    private searchBlur() {
        if (this.searchValue == "") {
            this.searchValue = "请输入搜索内容";
        }
    }
    private search() {
        if (this.searchValue == "请输入搜索内容") {
            var searchpattern = new RegExp("");
        } else {
            var searchpattern = new RegExp(this.searchValue);
        }
        var searchIndex = [];
        this.service.baseInfoVisibility.forEach(function (v, i) {
            if (v == 1) {
                searchIndex.push(i);
            }
        });
        var visiableList = [];
        this.service.baseInfoData.forEach(function (value, index, array) {
            value["visiable"] = 0;
            searchIndex.every(function (v, i) {
                if (searchpattern.test(value["data"][v])) {
                    value["visiable"] = 1;
                    return false;
                } else {
                    return true;
                }
            })
        });
    }

    private previous() {
        if (this.service.pageBar.pages[0] > this.service.pageBar.bottom) {
            this.service.pageBar.pages.forEach(function (v, i, arr) {
                arr[i] = arr[i] - 1;
            })
        }
    }

    private next() {
        var end = this.service.pageBar.pages.length - 1;
        if (this.service.pageBar.pages[end] < this.service.pageBar.top) {
            this.service.pageBar.pages.forEach(function (v, i, arr) {
                arr[i] = arr[i] + 1;
            })
        }
    }

    private switchPage(pageIndex) {
        this.service.pageBar.chosenPage = pageIndex;
        var hiddenBefore = (pageIndex - 1) * this.service.pageBar.scale;
        this.service.baseInfoData.forEach(function (v) {
            v["visiable"] = 0;
        })

        console.log(hiddenBefore);
        console.log(this.service.pageBar.scale);
        var hiddenAfter = hiddenBefore + this.service.pageBar.scale;
        if (hiddenAfter > this.service.baseInfoData.length) {
            hiddenAfter = this.service.baseInfoData.length;
        }
        for (var i = hiddenBefore; i < hiddenAfter; i++) {
            this.service.baseInfoData[i]["visiable"] = 1;
        }
    }

    //渲染翻页组建
    private initPageBar() {
        this.service.pageBar.pageNum = 3;//最多多少个可视切换页
        this.service.pageBar.scale = 5;//每页条目数
        this.service.pageBar.bottom = 1;//最小页码
        this.service.pageBar.top = Math.ceil(this.service.baseInfoData.length / this.service.pageBar.scale);//最大页码
        this.service.pageBar.pages = [];
        if (this.service.pageBar.pageNum > this.service.pageBar.top) {
            this.service.pageBar.pageNum = this.service.pageBar.top;
        }
        for (var i = 1; i <= this.service.pageBar.pageNum; i++) {
            this.service.pageBar.pages.push(i);
        }
        this.service.pageBar.chosenPage = 1;
        this.switchPage(1);

    }

    //请求本模块渲染的数据
    private initBaseInfo() {
        this.http.post(
            '/admin/bdFactoryInfo/getAll',
            "haha=heihei",
            {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
            }
        ).subscribe(datas => {
            this.service.baseInfoTitle = [];
            this.service.baseInfoData = [];

            for (var key in datas[0]) {
                if (datas[0][key] != 0 || datas[0][key] != "0") {
                    this.service.baseInfoTitle.push(key);
                }
            }
            for (var i in datas) {
                var obj = {
                    checked: 0,
                    data: [],
                }
                for (var j in this.service.baseInfoTitle) {
                    obj.data.push(datas[i][this.service.baseInfoTitle[j]]);
                }
                this.service.baseInfoData.push(obj);
            }
            //this.service.baseInfoData.push();
        });
    }

    constructor(
        private service: baseInfoService,
        public router: Router,
        private http: HttpClient,
    ) {
    }
    ngOnInit() {
        this.http.post(
            '/admin/bdFactoryInfo/getAll',
            "haha=heihei",
            {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
            }
        ).subscribe(datas => {
            console.log("hello");
        });

        if (this.service.initialization == 0) {
            //this.service.mockData(20);
            this.service.initBaseInfo(this.service.tabCard);
            this.subscription = this.service.asyncStatus.subscribe(status => {
                if (status == 200) {
                    this.initPageBar();
                }
            });
            this.service.initialization = 1;
            var obj = {};
            obj["baseInfoData"] = this.service.baseInfoData;
            obj["baseInfoTitle"] = this.service.baseInfoTitle;
            obj["baseInfoVisibility"] = this.service.baseInfoVisibility;
            this.service.dataTab[this.service.tabCard] = obj;
        }
        //this.switchPage(this.service.pageBar.chosenPage);
        console.log("初始化");
    }




    /*测试区*/
    public testhttp(): void {
        var body = "test=456&success=no";
        this.http.post(
            '/hello/testpost',
            body,
            {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
            }
        ).subscribe(data => {
            // Read the result field from the JSON response.
            alert(data);
            console.log(data);
        });/**/
    }
    public testinit() {
        //this.service.initBaseInfo("suibianla",);
    }




}