if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface UserBaseInfo_Params {
    userInfo?: personInfo;
    userStore?: StoreUtil;
    dialogController?: CustomDialogController;
}
interface changeSignature_Params {
    controller?: CustomDialogController;
    onSignatureChange?: (newSignature: string) => void;
}
import personInfo, { StoreUtil } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/PersonInfo";
import promptAction from "@ohos:promptAction";
let signature: string = "";
class changeSignature extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = undefined;
        this.onSignatureChange = () => { } // 回调函数 Initial as an empty function
        ;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: changeSignature_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.onSignatureChange !== undefined) {
            this.onSignatureChange = params.onSignatureChange;
        }
    }
    updateStateVars(params: changeSignature_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private onSignatureChange: (newSignature: string) => void; // 回调函数 Initial as an empty function
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(100);
            Column.width(300);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: "请输入你的签名" });
            TextInput.onChange((value: string) => {
                signature = value;
            });
            TextInput.margin({ top: 20 });
            TextInput.width(200);
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('确定', { type: ButtonType.Normal, stateEffect: true });
            Button.onClick(() => {
                this.onSignatureChange(signature); // 调用回调函数更新签名
                this.controller.close();
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class UserBaseInfo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__userInfo = new ObservedPropertyObjectPU(new personInfo(), this, "userInfo");
        this.userStore = new StoreUtil('userStore', 'userInfo');
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new changeSignature(this, {
                    onSignatureChange: (newSignature: string) => {
                        this.userInfo.userSignature = newSignature; // 更新签名
                        this.userStore.setData(this.userInfo).then(() => {
                            promptAction.showToast({
                                message: "签名更改并保存成功",
                                duration: 200,
                            });
                        }).catch((error: object) => {
                            promptAction.showToast({
                                message: "保存失败",
                                duration: 200,
                            });
                        });
                    }
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/view/UserBaseInfo.ets", line: 66 });
                jsDialog.setController(this.dialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        onSignatureChange: (newSignature: string) => {
                            this.userInfo.userSignature = newSignature; // 更新签名
                            this.userStore.setData(this.userInfo).then(() => {
                                promptAction.showToast({
                                    message: "签名更改并保存成功",
                                    duration: 200,
                                });
                            }).catch((error: object) => {
                                promptAction.showToast({
                                    message: "保存失败",
                                    duration: 200,
                                });
                            });
                        }
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            alignment: DialogAlignment.Default
        }, this);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: UserBaseInfo_Params) {
        if (params.userInfo !== undefined) {
            this.userInfo = params.userInfo;
        }
        if (params.userStore !== undefined) {
            this.userStore = params.userStore;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    updateStateVars(params: UserBaseInfo_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__userInfo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__userInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __userInfo: ObservedPropertyObjectPU<personInfo>;
    get userInfo() {
        return this.__userInfo.get();
    }
    set userInfo(newValue: personInfo) {
        this.__userInfo.set(newValue);
    }
    private userStore: StoreUtil;
    // 读取数据
    aboutToAppear(): void {
        // 不能使用 async await
        this.userStore.getData<personInfo>().then((data) => {
            if (data) {
                this.userInfo = data;
            }
            else {
                // 如果没有数据，则使用默认值
                this.userInfo = new personInfo();
            }
        }).catch(() => {
            // 处理获取数据失败的情况，使用默认值
            this.userInfo = new personInfo();
        });
    }
    private dialogController: CustomDialogController;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // userIcon
            Image.create({ "id": 16777424, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // userIcon
            Image.objectFit(ImageFit.Contain);
            // userIcon
            Image.height({ "id": 16777348, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // userIcon
            Image.width({ "id": 16777348, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // userIcon
            Image.margin({ top: { "id": 16777350, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width({ "id": 16777341, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.height({ "id": 16777327, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.margin({ top: { "id": 16777353, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Column.border({ radius: { "id": 16777344, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Column.backgroundColor({ "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('LV.8');
            Text.fontSize({ "id": 16777323, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bolder);
            Text.fontColor({ "id": 16777296, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // nickname
            Text.create(this.userInfo.userName);
            // nickname
            Text.fontSize({ "id": 16777329, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // nickname
            Text.fontFamily({ "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // nickname
            Text.margin({ bottom: { "id": 16777346, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            // nickname
            Text.fontWeight(FontWeight.Normal);
            // nickname
            Text.fontColor({ "id": 16777287, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        // nickname
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // signature
            Text.create(this.userInfo.userSignature);
            // signature
            Text.fontSize({ "id": 16777327, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // signature
            Text.fontWeight(FontWeight.Normal);
            // signature
            Text.fontFamily({ "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // signature
            Text.fontColor({ "id": 16777305, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // signature
            Text.onClick(() => {
                this.dialogController.open(); // 弹出对话框
            });
        }, Text);
        // signature
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
