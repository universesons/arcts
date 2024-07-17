if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MineIndex_Params {
}
import { ListInfo } from "@bundle:com.example.healthy_life/entry/ets/view/ListInfo";
import { UserBaseInfo } from "@bundle:com.example.healthy_life/entry/ets/view/UserBaseInfo";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
export class MineIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MineIndex_Params) {
    }
    updateStateVars(params: MineIndex_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(Const.FULL_HEIGHT);
            Column.backgroundColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new UserBaseInfo(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MinePage.ets", line: 30 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "UserBaseInfo" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ListInfo(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MinePage.ets", line: 32 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "ListInfo" });
        }
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MineIndex";
    }
}
registerNamedRoute(() => new MineIndex(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/MinePage", pageFullPath: "entry/src/main/ets/pages/MinePage", integratedHsp: "false" });
