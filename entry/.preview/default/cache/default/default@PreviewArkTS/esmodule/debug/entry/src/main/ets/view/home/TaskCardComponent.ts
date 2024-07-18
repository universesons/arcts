if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TaskCard_Params {
    taskInfoStr?: string;
    clickAction?: Function;
    taskInfo?: TaskInfo;
    name?: string;
    taskId?: number;
    currentValue?: string;
}
import { TaskMapById } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
import HealthText from "@bundle:com.example.healthy_life/entry/ets/view/HealthTextComponent";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import TaskInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskInfo";
function __Text__labelTextStyle(): void {
    Text.fontSize({ "id": 16777328, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontWeight(Const.FONT_WEIGHT_500);
    Text.opacity(Const.OPACITY_6);
    Text.fontFamily({ "id": 16777260, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
}
export class TaskCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__taskInfoStr = new SynchedPropertySimpleOneWayPU(params.taskInfoStr, this, "taskInfoStr");
        this.clickAction = (isClick: boolean) => {
            // 点击`打卡`按钮之后，表示已经完成
            this.taskInfo.isDone = true;
        };
        this.__taskInfo = new ObservedPropertyObjectPU(new TaskInfo(-1, '', -1, '', false, '', '', '', false, '', false), this, "taskInfo");
        this.__name = new ObservedPropertySimplePU('', this, "name");
        this.__taskId = new ObservedPropertySimplePU(this.taskInfo.taskID, this, "taskId");
        this.__currentValue = new ObservedPropertySimplePU('', this, "currentValue");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TaskCard_Params) {
        if (params.taskInfoStr === undefined) {
            this.__taskInfoStr.set('');
        }
        if (params.clickAction !== undefined) {
            this.clickAction = params.clickAction;
        }
        if (params.taskInfo !== undefined) {
            this.taskInfo = params.taskInfo;
        }
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.taskId !== undefined) {
            this.taskId = params.taskId;
        }
        if (params.currentValue !== undefined) {
            this.currentValue = params.currentValue;
        }
    }
    updateStateVars(params: TaskCard_Params) {
        this.__taskInfoStr.reset(params.taskInfoStr);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__taskInfoStr.purgeDependencyOnElmtId(rmElmtId);
        this.__taskInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__name.purgeDependencyOnElmtId(rmElmtId);
        this.__taskId.purgeDependencyOnElmtId(rmElmtId);
        this.__currentValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__taskInfoStr.aboutToBeDeleted();
        this.__taskInfo.aboutToBeDeleted();
        this.__name.aboutToBeDeleted();
        this.__taskId.aboutToBeDeleted();
        this.__currentValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __taskInfoStr: SynchedPropertySimpleOneWayPU<string>;
    get taskInfoStr() {
        return this.__taskInfoStr.get();
    }
    set taskInfoStr(newValue: string) {
        this.__taskInfoStr.set(newValue);
    }
    private clickAction: Function;
    private __taskInfo: ObservedPropertyObjectPU<TaskInfo>;
    get taskInfo() {
        return this.__taskInfo.get();
    }
    set taskInfo(newValue: TaskInfo) {
        this.__taskInfo.set(newValue);
    }
    private __name: ObservedPropertySimplePU<string>;
    get name() {
        return this.__name.get();
    }
    set name(newValue: string) {
        this.__name.set(newValue);
    }
    private __taskId: ObservedPropertySimplePU<number>;
    get taskId() {
        return this.__taskId.get();
    }
    set taskId(newValue: number) {
        this.__taskId.set(newValue);
    }
    private __currentValue: ObservedPropertySimplePU<string>; // 用户的某一个任务的当前值
    get currentValue() {
        return this.__currentValue.get();
    }
    set currentValue(newValue: string) {
        this.__currentValue.set(newValue);
    }
    aboutToAppear() {
        this.taskInfo = JSON.parse(this.taskInfoStr);
    }
    targetValueBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.taskInfo.isDone) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new 
                                // 修改问题1： 当不打卡的时候，是未完成
                                HealthText(ViewPU.__proto__ !== NativeViewPartialUpdate && parent instanceof PUV2ViewBase ? parent : this, { title: '', titleResource: { "id": -1, "type": -1, params: [this.taskInfo.isDone ? 'app.string.task_done' : 'app.string.task_undone'], "bundleName": "com.example.healthy_life", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/home/TaskCardComponent.ets", line: 61 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        title: '',
                                        titleResource: { "id": -1, "type": -1, params: [this.taskInfo.isDone ? 'app.string.task_done' : 'app.string.task_undone'], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    title: ''
                                });
                            }
                        }, { name: "HealthText" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/view/home/TaskCardComponent.ets(65:7)");
                    }, Row);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new HealthText(ViewPU.__proto__ !== NativeViewPartialUpdate && parent instanceof PUV2ViewBase ? parent : this, {
                                    // 根据任务类型对最初的初始值进行渲染
                                    // title: this.taskInfo.finValue || `--`,
                                    title: (() => {
                                        // 先判断是不是早睡早起，如果是早睡早起，说明度量是时间，用--，否则用`0`
                                        const currentValue = (this.taskInfo.taskID === 1 || this.taskInfo.taskID === 6) ? (this.taskInfo.finValue || '--') : (this.taskInfo.finValue || '0');
                                        return currentValue;
                                    })(),
                                    fontSize: { "id": 16777333, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/home/TaskCardComponent.ets", line: 66 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        // 根据任务类型对最初的初始值进行渲染
                                        // title: this.taskInfo.finValue || `--`,
                                        title: (() => {
                                            // 先判断是不是早睡早起，如果是早睡早起，说明度量是时间，用--，否则用`0`
                                            const currentValue = (this.taskInfo.taskID === 1 || this.taskInfo.taskID === 6) ? (this.taskInfo.finValue || '--') : (this.taskInfo.finValue || '0');
                                            return currentValue;
                                        })(),
                                        fontSize: { "id": 16777333, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    // 根据任务类型对最初的初始值进行渲染
                                    // title: this.taskInfo.finValue || `--`,
                                    title: (() => {
                                        // 先判断是不是早睡早起，如果是早睡早起，说明度量是时间，用--，否则用`0`
                                        const currentValue = (this.taskInfo.taskID === 1 || this.taskInfo.taskID === 6) ? (this.taskInfo.finValue || '--') : (this.taskInfo.finValue || '0');
                                        return currentValue;
                                    })()
                                });
                            }
                        }, { name: "HealthText" });
                    }
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(` / ${this.taskInfo.targetValue} ${TaskMapById[this.taskInfo.taskID - 1].unit}`);
                        Text.debugLine("entry/src/main/ets/view/home/TaskCardComponent.ets(76:9)");
                        __Text__labelTextStyle();
                        Text.fontWeight(Const.FONT_WEIGHT_400);
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
        }, If);
        If.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/home/TaskCardComponent.ets(84:5)");
            Row.width(Const.THOUSANDTH_1000);
            Row.height(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.borderRadius({ "id": 16777333, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.padding({ left: Const.THOUSANDTH_50, right: Const.THOUSANDTH_33 });
            Row.backgroundColor({ "id": 16777394, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.onClick(() => this.clickAction(true));
            Gesture.create(GesturePriority.Low);
            LongPressGesture.create();
            LongPressGesture.onAction(() => this.clickAction(false));
            LongPressGesture.pop();
            Gesture.pop();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: Const.DEFAULT_6 });
            Row.debugLine("entry/src/main/ets/view/home/TaskCardComponent.ets(85:7)");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(TaskMapById[this.taskInfo.taskID - 1].icon);
            Image.debugLine("entry/src/main/ets/view/home/TaskCardComponent.ets(86:9)");
            Image.width({ "id": 16777338, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.height({ "id": 16777338, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.objectFit(ImageFit.Contain);
        }, Image);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HealthText(this, {
                        title: '',
                        titleResource: TaskMapById[this.taskInfo.taskID - 1].taskName,
                        fontFamily: { "id": 16777260, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/home/TaskCardComponent.ets", line: 89 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '',
                            titleResource: TaskMapById[this.taskInfo.taskID - 1].taskName,
                            fontFamily: { "id": 16777260, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: ''
                    });
                }
            }, { name: "HealthText" });
        }
        Row.pop();
        this.targetValueBuilder.bind(this)(this);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
