if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ListInfo_Params {
    userInfo?: personInfo;
}
import { MineInfoList } from "@bundle:com.example.healthy_life/entry/ets/model/Mine";
import type { InfoItem } from "@bundle:com.example.healthy_life/entry/ets/model/Mine";
import promptAction from "@ohos:promptAction";
import type personInfo from '../viewmodel/PersonInfo';
import router from "@ohos:router";
export class ListInfo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__userInfo = new SynchedPropertyObjectTwoWayPU(params.userInfo, this, "userInfo");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ListInfo_Params) {
    }
    updateStateVars(params: ListInfo_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__userInfo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__userInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __userInfo: SynchedPropertySimpleOneWayPU<personInfo>;
    get userInfo() {
        return this.__userInfo.get();
    }
    set userInfo(newValue: personInfo) {
        this.__userInfo.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.border({
                radius: {
                    topLeft: { "id": 16777332, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                    topRight: { "id": 16777332, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                }
            });
            List.backgroundColor({ "id": 16777310, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            List.margin({ top: { "id": 16777332, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            List.padding({ top: { "id": 16777327, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            List.flexGrow(1);
            List.clip(true);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.onClick(() => {
                            if (item.id === '1') {
                                router.pushUrl({
                                    url: 'pages/PersonalInfo',
                                    params: this.userInfo
                                })
                                    .then(() => {
                                    // success
                                });
                            }
                            if (item.id === '2') {
                                promptAction.showToast({
                                    message: "已经是最新版啦"
                                });
                            }
                            if (item.id === '3') {
                                router.pushUrl({
                                    url: 'pages/AboutPage',
                                })
                                    .then(() => {
                                    // success
                                });
                            }
                        });
                        ListItem.backgroundColor({ "id": 16777310, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        ListItem.margin({
                            left: { "id": 16777332, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                            right: { "id": 16777332, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                        });
                        ListItem.height({ "id": 16777343, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        ListItem.border({
                            width: { bottom: { "id": 16777320, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } },
                            color: { "id": 16777289, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                        });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center });
                        }, Flex);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.title);
                            Text.fontSize({ "id": 16777327, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Text.height({ "id": 16777339, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            // 向右箭头
                            Image.create({ "id": 16777410, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            // 向右箭头
                            Image.objectFit(ImageFit.Contain);
                            // 向右箭头
                            Image.height({ "id": 16777323, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            // 向右箭头
                            Image.width({ "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        }, Image);
                        Flex.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, MineInfoList, forEachItemGenFunction, (item: InfoItem) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
