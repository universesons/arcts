if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Information_Params {
}
import InformationList from "@bundle:com.example.healthy_life/entry/ets/view/information/InformationListComponent";
class Information extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Information_Params) {
    }
    updateStateVars(params: Information_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create({ moduleName: "entry", pagePath: "entry/src/main/ets/pages/PersonalInfo" });
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new InformationList(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/PersonalInfo.ets", line: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "InformationList" });
        }
        Column.pop();
        Navigation.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Information";
    }
}
registerNamedRoute(() => new Information(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/PersonalInfo", pageFullPath: "entry/src/main/ets/pages/PersonalInfo", integratedHsp: "false" });
