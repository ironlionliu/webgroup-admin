/*
*Model：查询主模块的增加数据视图模块
*Description：查询主模块的增加数据视图模块
*Author:刘尚宇
*Finished：2017年10月10日
*/

import { Component } from "@angular/core";
import { baseInfoService } from "./baseInfo.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    templateUrl: "./baseInfoAdd.component.html",
})

export class baseInfoAddComponent {
    private validators = {};
    private addForm;
    private formItem = {};
    private errorMessage = [];//对应于service中的baseInfoTitle的维度。
    private tempInput = [];
    private mode = "edit";
    constructor(
        private service: baseInfoService,
        private router: Router,
        private http: HttpClient,
    ) {

        if (this.service.currentState["editTarget"] == -1) {
            this.mode = "add";

        } else {
            this.mode = "edit";
        }
        this.init();
    }
    private initValidator(title, value) {

        for (var i = 0; i < title.length; i++) {
            this.validators[title[i]] = value[i];
        }
    }

    public init() {
        var value, inputValue = [];
        value = [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]];//每个数组对应的列表是service中validator列表
        this.initValidator(this.service.baseInfoTitle, value);
        for (var i = 0; i < this.service.baseInfoTitle.length; i++) {
            if (this.mode == "add") {
                inputValue[i] = "";
            } else {
                inputValue[i] = this.service.baseInfoData[this.service.currentState["editTarget"]]["data"][i];
            }
            if (this.validators[this.service.baseInfoTitle[i]].length == 0) {
                this.formItem[this.service.baseInfoTitle[i]] = new FormControl(inputValue[i], Validators.required);
            } else {
                //this.validators是二维数组,每个元素对应的是这个item的验证器
                var validatorsIndex = this.validators[this.service.baseInfoTitle[i]];
                var validator = [];
                validatorsIndex.forEach(index => {
                    validator.push(this.service.validators[index]);
                });
                this.formItem[this.service.baseInfoTitle[i]] = new FormControl(inputValue[i], validator)
            }


        }
        this.addForm = new FormGroup(this.formItem);
    }


    public validate(i) {
        var noError = 1;
        this.errorMessage[i] = "";
        var data = this.service.baseInfoTitle;
        for (var key in this.addForm.get(data[i]).errors) {
            this.errorMessage[i] = this.errorMessage[i] + "\n" + this.service.errorMessages[key];
        }
        if (this.addForm.get(data[i]).errors) {
            noError = 0;
            return noError;
        }
    }

    public validateAll() {
        var noError = 1;
        var data = this.service.baseInfoTitle;
        for (var i = 0; i < data.length; i++) {
            if (this.validate(i) == 0) {
                noError = 0;
            }
        }
        return noError;
    }


    private getInput(event, i) {
        this.tempInput[i] = event.target.value;
        console.log(event.target.value);
    }
    public save() {
        // this.validateAll();
        if (this.validateAll() == 1) {
            console.log(this.tempInput)
            var addItem = {
                checked: 0,
                data: []
            }
            if (this.mode == "add") {
                addItem.data = this.tempInput;
                this.service.baseInfoData.push(addItem);
                this.service.addFactory(addItem.data, this.service.tabCard);
            } else if (this.mode == "edit") {
                for (var i = 0; i < this.tempInput.length; i++) {
                    if (this.tempInput[i]) {
                        this.service.baseInfoData[this.service.currentState['editTarget']]['data'][i] = this.tempInput[i];
                    }
                }
                this.service.updateFactory(addItem.data, this.service.tabCard);
            }
            this.router.navigate(["/baseInfo"]);
        }


        this.service.baseInfoData.forEach(function (v) {
            v["visiable"] = 1;
        });

    }
    public cancel() {
        this.service.baseInfoData.forEach(function (v) {
            v["visiable"] = 1;
        });
        this.router.navigate(["/baseInfo"]);
    }

}