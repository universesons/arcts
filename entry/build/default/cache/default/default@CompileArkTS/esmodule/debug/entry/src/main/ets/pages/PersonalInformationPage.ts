if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Information_Params {
    message?: string;
}
class Information extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__message = new ObservedPropertySimplePU('Hello World', this, "message");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Information_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    updateStateVars(params: Information_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __message: ObservedPropertySimplePU<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.message);
            Text.fontSize(50);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 添加按钮，以响应用户点击
            Button.createWithChild();
            // 添加按钮，以响应用户点击
            Button.type(ButtonType.Capsule);
            // 添加按钮，以响应用户点击
            Button.margin({
                top: 20
            });
            // 添加按钮，以响应用户点击
            Button.backgroundColor('#0D9FFB');
            // 添加按钮，以响应用户点击
            Button.width('40%');
            // 添加按钮，以响应用户点击
            Button.height('5%');
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Next');
            Text.fontSize(30);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        // 添加按钮，以响应用户点击
        Button.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Information";
    }
}
registerNamedRoute(() => new Information(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/PersonalInformationPage", pageFullPath: "entry/src/main/ets/pages/PersonalInformationPage", integratedHsp: "false" });
