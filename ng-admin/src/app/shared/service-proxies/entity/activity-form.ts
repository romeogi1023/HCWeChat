export class ActivityForm implements IActivityForm {
    id: string;
    formCode: string;
    activityId: string;
    retailerId: string;
    activityGoodsId: string;
    goodsSpecification: string;
    num: number;
    reason: string;
    status: number;
    creationTime: Date;
    activityName: string;
    retailerName: string;
    managerName: string;
    constructor(data?: IActivityForm) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.formCode = data["formCode"];
            this.activityId = data["activityId"];
            this.retailerId = data["retailerId"];
            this.activityGoodsId = data["activityGoodsId"];
            this.goodsSpecification = data["goodsSpecification"];
            this.num = data["num"];
            this.reason = data["reason"];
            this.status = data["status"];
            this.creationTime = data["creationTime"];
            this.activityName = data["activityName"];
            this.retailerName = data["retailerName"];
            this.managerName = data["managerName"];
        }
    }

    static fromJS(data: any): ActivityForm {
        let result = new ActivityForm();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        this.id = data["id"];
        this.formCode = data["formCode"];
        this.activityId = data["activityId"];
        this.retailerId = data["retailerId"];
        this.activityGoodsId = data["activityGoodsId"];
        this.goodsSpecification = data["goodsSpecification"];
        this.num = data["num"];
        this.reason = data["reason"];
        this.status = data["status"];
        this.creationTime = data["creationTime"];
        this.activityName = data["activityName"];
        this.retailerName = data["retailerName"];
        this.managerName = data["managerName"];
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new ActivityForm();
        result.init(json);
        return result;
    }
}
export interface IActivityForm {
    id: string;
    formCode: string;
    activityId: string;
    retailerId: string;
    activityGoodsId: string;
    goodsSpecification: string;
    num: number;
    reason: string;
    status: number;
    creationTime: Date;
    activityName: string;
    retailerName: string;
    managerName: string;
}

export class ActivityFormDto implements IActivityFormDto {
    id: string;
    formCode: string;
    activityId: string;
    retailerId: string;
    activityGoodsId: string;
    goodsSpecification: string;
    num: number;
    reason: string;
    status: number;
    statusName: string;
    creationTime: Date;
    activityName: string;
    retailerName: string;
    managerName: string;

    constructor(data?: IActivityFormDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.formCode = data["formCode"];
            this.activityId = data["activityId"];
            this.retailerId = data["retailerId"];
            this.activityGoodsId = data["activityGoodsId"];
            this.goodsSpecification = data["goodsSpecification"];
            this.num = data["num"];
            this.reason = data["reason"];
            this.status = data["status"];
            this.creationTime = data["creationTime"];
            this.activityName = data["activityName"];
            this.retailerName = data["retailerName"];
            this.managerName = data["managerName"];
        }
    }

    static fromJS(data: any): ActivityFormDto {
        let result = new ActivityFormDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["formCode"] = this.formCode;
        data["activityId"] = this.activityId;
        data["retailerId"] = this.retailerId;
        data["activityGoodsId"] = this.activityGoodsId;
        data["goodsSpecification"] = this.goodsSpecification;
        data["num"] = this.num;
        data["reason"] = this.reason;
        data["status"] = this.status;
        data["creationTime"] = this.creationTime;
        data["activityName"] = this.activityName;
        data["retailerName"] = this.retailerName;
        data["managerName"] = this.managerName;

        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new ActivityFormDto();
        result.init(json);
        return result;
    }
}

export interface IActivityFormDto {
    id: string;
    formCode: string;
    activityId: string;
    retailerId: string;
    activityGoodsId: string;
    goodsSpecification: string;
    num: number;
    reason: string;
    status: number;
    creationTime: Date;
    activityName: string;
    retailerName: string;
    managerName: string;
}