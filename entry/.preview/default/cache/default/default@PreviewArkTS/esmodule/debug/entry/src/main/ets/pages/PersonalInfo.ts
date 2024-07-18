if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Information_Params {
    userInfo?: personInfo;
}
import router from "@ohos:router";
import InformationList from "@bundle:com.example.healthy_life/entry/ets/view/information/InformationListComponent";
import type personInfo from '../viewmodel/PersonInfo';
class Information extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__userInfo = new ObservedPropertyObjectPU(router.getParams() as personInfo, this, "userInfo");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Information_Params) {
        if (params.userInfo !== undefined) {
            this.userInfo = params.userInfo;
        }
    }
    updateStateVars(params: Information_Params) {
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create({ moduleName: "entry", pagePath: "entry/src/main/ets/pages/PersonalInfo" });
            Navigation.debugLine("entry/src/main/ets/pages/PersonalInfo.ets(14:5)");
            Navigation.title('个人信息编辑');
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            RelativeContainer.create();
            RelativeContainer.debugLine("entry/src/main/ets/pages/PersonalInfo.ets(15:7)");
            RelativeContainer.width('100%');
        }, RelativeContainer);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new InformationList(this, { userInfo: this.__userInfo }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/PersonalInfo.ets", line: 16 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            userInfo: this.userInfo
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "InformationList" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("返回");
            Button.debugLine("entry/src/main/ets/pages/PersonalInfo.ets(17:9)");
            Button.width(200);
            Button.margin({ bottom: 40 });
            Button.onClick(() => {
                router.back();
            });
            Button.alignRules({
                bottom: { anchor: "__container__", align: VerticalAlign.Bottom },
                middle: { anchor: "__container__", align: HorizontalAlign.Center },
            });
        }, Button);
        Button.pop();
        RelativeContainer.pop();
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Information";
    }
}
registerNamedRoute(() => new Information(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/PersonalInfo", pageFullPath: "entry/src/main/ets/pages/PersonalInfo", integratedHsp: "false" });
