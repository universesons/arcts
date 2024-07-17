if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MainPageComponent_Params {
    isLogin?: boolean;
    show?: Resource;
    showPanel?: boolean;
    avatar?: image.PixelMap | undefined;
}
interface Page_Params {
    show?: Resource;
    isLogin?: boolean;
    showPanel?: boolean;
    avatar?: image.PixelMap | undefined;
    /**
     * Define the privacy text on LoginPanel.
     */
    privacyText?: loginComponentManager.PrivacyText[];
    /**
     * Construct a controller for LoginPanel.
     */
    controller?: loginComponentManager.LoginPanelController;
    routerParams?;
}
import { loginComponentManager, LoginPanel } from "@hms:core.account.LoginComponent";
import authentication from "@hms:core.authentication";
import type { BusinessError } from "@ohos:base";
import type image from "@ohos:multimedia.image";
import hilog from "@ohos:hilog";
import router from "@ohos:router";
class Page extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__show = new ObservedPropertyObjectPU({ "id": 16777417, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, this, "show");
        this.__isLogin = new ObservedPropertySimplePU(false, this, "isLogin");
        this.__showPanel = new ObservedPropertySimplePU(false, this, "showPanel");
        this.__avatar = new ObservedPropertyObjectPU(undefined, this, "avatar");
        this.privacyText = [
            {
                text: { "id": 16777406, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                type: loginComponentManager.TextType.PLAIN_TEXT
            },
            {
                text: { "id": 16777422, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                tag: 'privacy',
                type: loginComponentManager.TextType.RICH_TEXT
            },
            {
                text: { "id": 16777407, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                type: loginComponentManager.TextType.PLAIN_TEXT
            },
            {
                text: { "id": 16777423, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                tag: 'protocols',
                type: loginComponentManager.TextType.RICH_TEXT
            },
            {
                text: { "id": 16777412, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                type: loginComponentManager.TextType.PLAIN_TEXT
            }
        ];
        this.controller = new loginComponentManager.LoginPanelController()
            .onClickLoginWithHuaweiIDButton((error: BusinessError, response: loginComponentManager.HuaweiIDCredential) => {
            hilog.info(0x0000, 'testTag', 'onClickLoginWithHuaweiIDButton');
            if (error) {
                hilog.error(0x0000, 'testTag', 'error ' + JSON.stringify(error));
                if (error.code == authentication.AuthenticationErrorCode.NETWORK_ERROR) {
                    AlertDialog.show({
                        message: { "id": 16777413, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                        offset: { dx: 0, dy: -20 },
                        alignment: DialogAlignment.Bottom,
                        autoCancel: false,
                        confirm: {
                            value: { "id": 16777414, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                            action: () => {
                            }
                        }
                    });
                }
                return;
            }
            if (response) {
                hilog.info(0x0000, 'testTag', 'response ' + JSON.stringify(response));
                this.isLogin = true;
                this.showPanel = false;
                this.show = { "id": 16777411, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
                return;
            }
        })
            .onClickOptionalLoginButton(() => {
            hilog.info(0x0000, 'testTag', 'onClickOptionalLoginButton');
        })
            .onClickPrivacyText((error: BusinessError, tag: string) => {
            hilog.info(0x0000, 'testTag', 'onClickPrivacyText tag:' + tag);
        })
            .onClickCloseButton(() => {
            hilog.info(0x0000, 'testTag', 'onClickCloseButton');
        });
        this.routerParams = router.getParams() as Record<string, image.PixelMap>;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Page_Params) {
        if (params.show !== undefined) {
            this.show = params.show;
        }
        if (params.isLogin !== undefined) {
            this.isLogin = params.isLogin;
        }
        if (params.showPanel !== undefined) {
            this.showPanel = params.showPanel;
        }
        if (params.avatar !== undefined) {
            this.avatar = params.avatar;
        }
        if (params.privacyText !== undefined) {
            this.privacyText = params.privacyText;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.routerParams !== undefined) {
            this.routerParams = params.routerParams;
        }
    }
    updateStateVars(params: Page_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__show.purgeDependencyOnElmtId(rmElmtId);
        this.__isLogin.purgeDependencyOnElmtId(rmElmtId);
        this.__showPanel.purgeDependencyOnElmtId(rmElmtId);
        this.__avatar.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__show.aboutToBeDeleted();
        this.__isLogin.aboutToBeDeleted();
        this.__showPanel.aboutToBeDeleted();
        this.__avatar.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __show: ObservedPropertyObjectPU<Resource>;
    get show() {
        return this.__show.get();
    }
    set show(newValue: Resource) {
        this.__show.set(newValue);
    }
    private __isLogin: ObservedPropertySimplePU<boolean>;
    get isLogin() {
        return this.__isLogin.get();
    }
    set isLogin(newValue: boolean) {
        this.__isLogin.set(newValue);
    }
    /**
     * Whether to show LoginPanel component.
     */
    private __showPanel: ObservedPropertySimplePU<boolean>;
    get showPanel() {
        return this.__showPanel.get();
    }
    set showPanel(newValue: boolean) {
        this.__showPanel.set(newValue);
    }
    private __avatar: ObservedPropertyObjectPU<image.PixelMap | undefined>;
    get avatar() {
        return this.__avatar.get();
    }
    set avatar(newValue: image.PixelMap | undefined) {
        this.__avatar.set(newValue);
    }
    /**
     * Define the privacy text on LoginPanel.
     */
    private privacyText: loginComponentManager.PrivacyText[];
    /**
     * Construct a controller for LoginPanel.
     */
    private controller: loginComponentManager.LoginPanelController;
    private routerParams;
    aboutToAppear() {
        hilog.info(0x0000, 'testTag', 'aboutToAppear');
        this.silentLogin();
        this.avatar = AppStorage.get('avatar');
    }
    onPageShow() {
        hilog.info(0x0000, 'testTag', 'onPageShow');
        if (this.routerParams) {
            this.avatar = this.routerParams.avatar;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/Page.ets(106:5)");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/Page.ets(107:7)");
        }, Stack);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new MainPageComponent(this, {
                        isLogin: this.__isLogin,
                        show: this.__show,
                        showPanel: this.__showPanel,
                        avatar: this.__avatar
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Page.ets", line: 108 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            isLogin: this.isLogin,
                            show: this.show,
                            showPanel: this.showPanel,
                            avatar: this.avatar
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "MainPageComponent" });
        }
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/Page.ets(116:7)");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showPanel) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // set the params for LoginPanel component
                        Stack.create();
                        Stack.debugLine("entry/src/main/ets/pages/Page.ets(119:11)");
                        // set the params for LoginPanel component
                        Stack.height('100%');
                        // set the params for LoginPanel component
                        Stack.width('100%');
                    }, Stack);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LoginPanel(this, {
                                    show: this.__showPanel,
                                    params: {
                                        appInfo: {
                                            appIcon: { "id": 16777425, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                                            appName: { "id": 16777409, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                                            appDescription: { "id": 16777408, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                                        },
                                        privacyText: this.privacyText,
                                        loginType: loginComponentManager.LoginType.ID,
                                        optionalLoginButtonAttr: { text: { "id": 16777419, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } },
                                    },
                                    controller: this.controller
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Page.ets", line: 120 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        show: this.showPanel,
                                        params: {
                                            appInfo: {
                                                appIcon: { "id": 16777425, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                                                appName: { "id": 16777409, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                                                appDescription: { "id": 16777408, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                                            },
                                            privacyText: this.privacyText,
                                            loginType: loginComponentManager.LoginType.ID,
                                            optionalLoginButtonAttr: { text: { "id": 16777419, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } },
                                        },
                                        controller: this.controller
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "LoginPanel" });
                    }
                    // set the params for LoginPanel component
                    Stack.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
        Stack.pop();
    }
    private silentLogin(): void {
        hilog.info(0x0000, 'testTag', 'silentLogin');
        // new a request to login, and set the params
        let loginRequest = new authentication.HuaweiIDProvider().createLoginWithHuaweiIDRequest();
        // whether to force to pull up the Huawei account login page, when the user doesn't log Huawei account
        loginRequest.forceLogin = false;
        // execute the login request
        let controller = new authentication.AuthenticationController();
        controller.executeRequest(loginRequest).then((data) => {
            let loginWithHuaweiIDResponse = data as authentication.LoginWithHuaweiIDResponse;
            let loginWithHuaweiIDCredential = loginWithHuaweiIDResponse.data!;
            let authCode = loginWithHuaweiIDCredential.authorizationCode;
            let idToken = loginWithHuaweiIDCredential.idToken;
            let openID = loginWithHuaweiIDCredential.openID;
            let unionID = loginWithHuaweiIDCredential.unionID;
            this.isLogin = true;
            this.show = { "id": 16777411, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
            hilog.debug(0x0000, 'testTag', 'login success, %{public}s', JSON.stringify(loginWithHuaweiIDResponse));
        }).catch((error: BusinessError) => {
            hilog.error(0x0000, 'testTag', '%{public}s, code: %{public}d', JSON.stringify(error), error.code);
            this.show = { "id": 16777417, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
            if (error.code === authentication.AuthenticationErrorCode.NETWORK_ERROR) {
                AlertDialog.show({
                    message: { "id": 16777413, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                    offset: { dx: 0, dy: -20 },
                    alignment: DialogAlignment.Bottom,
                    autoCancel: false,
                    confirm: {
                        value: { "id": 16777414, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                        action: () => {
                        }
                    }
                });
            }
        });
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Page";
    }
}
class MainPageComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isLogin = new SynchedPropertySimpleTwoWayPU(params.isLogin, this, "isLogin");
        this.__show = new SynchedPropertyObjectTwoWayPU(params.show, this, "show");
        this.__showPanel = new SynchedPropertySimpleTwoWayPU(params.showPanel, this, "showPanel");
        this.__avatar = new SynchedPropertyObjectTwoWayPU(params.avatar, this, "avatar");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MainPageComponent_Params) {
    }
    updateStateVars(params: MainPageComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isLogin.purgeDependencyOnElmtId(rmElmtId);
        this.__show.purgeDependencyOnElmtId(rmElmtId);
        this.__showPanel.purgeDependencyOnElmtId(rmElmtId);
        this.__avatar.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isLogin.aboutToBeDeleted();
        this.__show.aboutToBeDeleted();
        this.__showPanel.aboutToBeDeleted();
        this.__avatar.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __isLogin: SynchedPropertySimpleTwoWayPU<boolean>;
    get isLogin() {
        return this.__isLogin.get();
    }
    set isLogin(newValue: boolean) {
        this.__isLogin.set(newValue);
    }
    private __show: SynchedPropertySimpleOneWayPU<Resource>;
    get show() {
        return this.__show.get();
    }
    set show(newValue: Resource) {
        this.__show.set(newValue);
    }
    private __showPanel: SynchedPropertySimpleTwoWayPU<boolean>;
    get showPanel() {
        return this.__showPanel.get();
    }
    set showPanel(newValue: boolean) {
        this.__showPanel.set(newValue);
    }
    private __avatar: SynchedPropertySimpleOneWayPU<image.PixelMap | undefined>;
    get avatar() {
        return this.__avatar.get();
    }
    set avatar(newValue: image.PixelMap | undefined) {
        this.__avatar.set(newValue);
    }
    aboutToAppear() {
        hilog.info(0x0000, 'testTag', 'MainPage: aboutToAppear');
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Page.ets(195:5)");
            Column.alignItems(HorizontalAlign.Start);
            Column.backgroundColor({ "id": 125829132, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.padding({ left: { "id": 16777433, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, right: { "id": 16777434, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Page.ets(196:7)");
            Row.margin({ top: { "id": 16777431, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Row.padding({ left: { "id": 16777432, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Row.height({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.avatar != undefined ? this.avatar : { "id": 16777424, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/Page.ets(197:9)");
            Image.width({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.height({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.onClick(() => {
                if (this.isLogin) {
                    // the developer can define the target page to jump
                }
                else {
                    this.showPanel = true;
                }
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.show);
            Text.debugLine("entry/src/main/ets/pages/Page.ets(207:9)");
            Text.fontSize({ "id": 16777429, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.height({ "id": 16777430, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.padding({ left: { "id": 16777432, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Text.onClick(() => {
                if (this.isLogin) {
                    // the developer can define the target page to jump
                }
                else {
                    this.showPanel = true;
                }
            });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new Page(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/Page", pageFullPath: "entry/src/main/ets/pages/Page", integratedHsp: "false" });
