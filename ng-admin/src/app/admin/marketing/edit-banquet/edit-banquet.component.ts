import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ActivityBanquetDto } from '@shared/service-proxies/entity';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { ActivityBanquetServiceProxy } from '@shared/service-proxies/marketing-service';

//import * as _ from "lodash";

import { filter } from 'rxjs/operators/filter';
import { HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'edit-banquet-modal',
    templateUrl: './edit-banquet.component.html'
})
export class EditBanquetComponent extends AppComponentBase implements OnInit {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    title: string = '宴席信息';

    modalVisible = false;
    isConfirmLoading = false;
    isDisablec = false;
    banquetDto: ActivityBanquetDto = null;
    form: FormGroup;

    uploading = false;
    fileList = [];

    constructor(
        injector: Injector,
        private _activityBanquetService: ActivityBanquetServiceProxy,
        private fb: FormBuilder,
        private http: HttpClient, private msg: NzMessageService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            area: [null, [Validators.required]],
            responsible: [null, [Validators.required, Validators.maxLength(50)]],
            executor: [null, [Validators.required, Validators.maxLength(50)]],
            banquetTime: [null, [Validators.required]],
            position: [null, [Validators.required, Validators.maxLength(500)]],
            num: [null, [Validators.required]],
            desc: [null, [Validators.required, Validators.maxLength(500)]],
        });
    }
    
    show(delivery: ActivityBanquetDto): void {
        this.reset();
        this.banquetDto = delivery;
        this.modalVisible = true;
        //对isDisablec做初始化
        this.isDisablec = false;
    }

    save(isSave = false): void {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        this.banquetDto.photoUrl = 'test.jpg';
        if (this.form.valid) {
            this._activityBanquetService.update(this.banquetDto)
                .finally(() => { this.isConfirmLoading = false; })
                .subscribe(() => {
                    this.notify.info('保存成功！');
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }

    close(): void {
        this.modalVisible = false;
        //this.modal.hide();
    }

    handleCancel = (e) => {
        this.modalVisible = false;
        this.isConfirmLoading = false;
        this.reset(e);
    }

    getFormControl(name: string) {
        return this.form.controls[name];
    }

    reset(e?): void {
        if (e) {
            e.preventDefault();
        }
        this.form.reset();
        for (const key in this.form.controls) {
            this.form.controls[key].markAsPristine();
        }
    }

    handleChange(info: { file: UploadFile }): void {
        this._activityBanquetService.uploadBase64(info.file).subscribe(result => {
            
        });
    }

    beforeUpload = (file: UploadFile): boolean => {
        this.fileList.push(file);
        return false;
      }

      handleUpload() {
        const formData = new FormData();
        this.fileList.forEach((file: any) => {
          formData.append('files[]', file);
        });
        this.uploading = true;
        // You can use any AJAX library you like
        const req = new HttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts/', formData, {
          // reportProgress: true
        });
        this.http.request(req).pipe(filter(e => e instanceof HttpResponse)).subscribe((event: any) => {
          this.uploading = false;
          this.msg.success('upload successfully.');
        }, (err) => {
          this.uploading = false;
          this.msg.error('upload failed.');
        });
      }
}
