import { Component, OnInit, Injector } from '@angular/core';
import { extend } from 'webdriver-js-extender';
import { AppComponentBase } from '@shared/app-component-base';
import { ActivityFormServiceProxy, PagedResultDtoOfPostInfo, ActivityDeliveryInfoServiceProxy } from '@shared/service-proxies/marketing-service';
import { PostInfo, Parameter } from '@shared/service-proxies/entity';
import { NzModalService } from 'ng-zorro-antd';

@Component({
    moduleId: module.id,
    selector: 'post-info',
    templateUrl: 'post-info.component.html'
})
export class PostInfoComponent extends AppComponentBase implements OnInit {

    postInfos: PostInfo[] = [];
    search: any = { startTime: null, endTime: null, userType: 0, isSend: 0 };
    allChecked = false;
    curRows: any[] = [];
    indeterminate = false;
    idList = [];
    userTypeS = [
        { text: '全部', value: 0 },
        { text: '消费者', value: 1 },
        { text: '推荐人', value: 2 }
    ];
    isSends = [
        { text: '全部', value: 0 },
        { text: '是', value: true },
        { text: '否', value: false }
    ];
    constructor(injector: Injector, private activityFormServie: ActivityFormServiceProxy,
        private activityFormDeliveryService: ActivityDeliveryInfoServiceProxy,
        private modal: NzModalService) {
        super(injector);
    }
    ngOnInit(): void {
        this.refreshData();
    }

    refreshData(reset = false, search?: boolean) {
        if (reset) {
            this.query.pageIndex = 1;
            this.search = { startTime: null, endTime: null, userType: 0, isSend: 0 };
        }
        if (search) {
            this.query.pageIndex = 1;
        }
        this.activityFormServie.getAllPostInfo(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfPostInfo) => {
            this.postInfos = result.items.map(i => {
                i.isSendName = i.isSend == false ? '否' : '是';
                i.disabled = i.isSend == true ? true : false;
                // i.checked = false;
                return i;
            });
            this.query.total = result.totalCount;
        });
    }
    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'FormCode', value: this.search.formCode }));
        arry.push(Parameter.fromJS({ key: 'BeginDate', value: this.dateFormat(this.search.startTime) }));
        arry.push(Parameter.fromJS({ key: 'EndDate', value: this.dateFormat(this.search.endTime) }));
        arry.push(Parameter.fromJS({ key: 'ProductSpecification', value: this.search.specification }));
        arry.push(Parameter.fromJS({ key: 'UserType', value: this.search.userType == 0 ? null : this.search.userType }));
        arry.push(Parameter.fromJS({ key: 'Filter', value: this.search.name }));
        arry.push(Parameter.fromJS({ key: 'Phone', value: this.search.phone }));
        arry.push(Parameter.fromJS({ key: 'IsSend', value: this.search.isSend == 0 ? null : this.search.isSend }));
        return arry;
    }

    dataChanges(res) {
        console.log('res');
        console.log(res);
        this.curRows = res;
        this.refreshCheckStatus()
    }

    refreshCheckStatus() {
        // const allChecked = this.curRows.every(value => value.disabled || value.checked);
        // const allUnChecked = this.curRows.every(value => value.disabled || !value.checked);
        var length = this.curRows.filter(value => !value.disabled).length;
        const allChecked = length > 0 ? this.curRows.filter(value => !value.disabled).every(value => value.checked === true) : false;
        const allUnChecked = this.curRows.filter(value => !value.disabled).every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
        console.log('refreshCheckStatus:allChecked');
        console.log(this.allChecked);
    }
    /**
     * 标记为已邮寄
     */
    markIsSend() {

        //     $("table input[type=checkbox]:checked").map(function (i) {
        //     //    var ss= $(i.target).parents('tr').children("td").eq(i).text()
        //    var ss= $("table tr").eq(i).find("td").eq(1).text();
        //          console.log('checkbox');
        //          console.log(ss);
        //     })
        this.idList = [];
        this.curRows.forEach(i => {
            if (i.checked) {
                this.idList.push(i.id);
                console.log('idList');
                console.log(this.idList);
                if (this.idList.length > 0) {
                    this.activityFormDeliveryService.updateIsSend(this.idList).subscribe(() => {
                        this.notify.info(this.l('标记成功！'));
                        // this.allChecked = false;
                        // this.refreshCheckStatus();
                        this.refreshData();
                    });
                } else {
                    this.notify.warn('请选择需要标记的邮寄信息');
                }
            }
        });
        if (this.idList.length <= 0) {
            this.notify.warn('请选择需要标记的邮寄信息');
        }


        // this.idList.push('8aa761de-9646-4fe2-4337-08d5a046601a');
        // this.activityFormDeliveryService.updateIsSend(this.idList).subscribe(() => {
        //     this.notify.info(this.l('标记成功！'));
        // });
    }

    /**
     * 全选按钮
     * @param value 
     */
    checkAll(value: boolean) {
        // this.postInfos.forEach(i => {
        //     i.isSend = value;
        // });
        this.curRows.forEach(i => {
            if (!i.disabled) {
                i.checked = value;
            }
        });
        this.refreshCheckStatus();
    }
    /**
     * 导出Excel
     */
    exportExcel() {

    }
}
