/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import personInfo, { StoreUtil } from '../viewmodel/PersonInfo';
import { promptAction } from '@kit.ArkUI';

let signature:string = "";
// 修改签名的输入框
@CustomDialog
struct changeSignature {
  controller: CustomDialogController
  onSignatureChange: (newSignature: string) => void = () =>{} // 回调函数 Initial as an empty function

  build() {
    Column() {
      TextInput({ placeholder: "请输入你的签名" })
        .onChange((value: string) => {
          signature = value
        })
        .margin({ top: 20 })
        .width(200)
      Button('确定', { type: ButtonType.Normal, stateEffect: true })
        .onClick(() => {
          this.onSignatureChange(signature); // 调用回调函数更新签名
          this.controller.close();
        })
    }
    .height(100)
    .width(300)
  }
}

@Component
export struct UserBaseInfo {
  @Link userInfo: personInfo;
  userStore: StoreUtil = new StoreUtil('userStore', 'userInfo');

  dialogController: CustomDialogController = new CustomDialogController({
    builder: changeSignature({
      onSignatureChange: (newSignature: string) => {
        this.userInfo.userSignature = newSignature; // 更新签名
        this.userStore.setData(this.userInfo).then(()=>{
          promptAction.showToast({
            message:"签名更改并保存成功",
            duration:200,
          });
        }).catch((error : object)=>{
            promptAction.showToast({
              message :"保存失败",
              duration:200,
            })
        })
      }
    }),
    alignment: DialogAlignment.Default,  // 可设置dialog的对齐方式，设定显示在底部或中间等，默认为底部显示
  })

  build() {
    Column() {
      // userIcon
      Image($r('app.media.ic_user'))
        .objectFit(ImageFit.Contain)
        .height($r('app.float.default_66'))
        .width($r('app.float.default_66'))
        .margin({ top: $r('app.float.default_71') })

      Column() {
        Text('LV.8')
          .fontSize($r('app.float.default_12'))
          .fontWeight(FontWeight.Bolder)
          .fontColor($r('app.color.leveColor'))
      }
      .width($r('app.float.default_44'))
      .height($r('app.float.default_16'))
      .margin({ top: $r('app.float.default_n8') })
      .border({ radius: $r('app.float.default_5') })
      .backgroundColor($r('app.color.leveBgColor'))
      .justifyContent(FlexAlign.Center)

      // nickname
      Text(this.userInfo.userName)
        .fontSize($r('app.float.default_20'))
        .fontFamily($r('app.string.Helvetica'))
        .margin({ bottom: $r('app.float.default_6') })
        .fontWeight(FontWeight.Normal)
        .fontColor($r('app.color.black'))

      // signature
      Text(this.userInfo.userSignature).fontSize($r('app.float.default_16')).fontWeight(FontWeight.Normal)
        .fontFamily($r('app.string.PingFangSC_Regular'))
        .fontColor($r('app.color.signatureColor'))
        .onClick(() => {
          this.dialogController.open(); // 弹出对话框
        })
    }
  }
}