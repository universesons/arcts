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

import { MineInfoList, InfoItem } from '../model/Mine';
import { promptAction } from '@kit.ArkUI';
import personInfo from '../viewmodel/PersonInfo';
import router from '@ohos.router'

@Component
export struct ListInfo {
  @Link userInfo: personInfo;

  build() {
    List() {
      ForEach(MineInfoList, (item: InfoItem) => {
        ListItem() {
          Flex({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center }) {
            Text(item.title).fontSize($r('app.float.default_16')).height($r('app.float.default_40'))
            // 向右箭头
            Image($r('app.media.ic_right_grey'))
              .objectFit(ImageFit.Contain)
              .height($r('app.float.default_12'))
              .width($r('app.float.default_7'))
          }
        }
        .onClick(() => {
          if (item.id === '1') {
            router.pushUrl({
              url: 'pages/PersonalInfo', // 直接将用户数据下沉到具体编辑界面读取
              params: this.userInfo
            })
              .then(() => {
                // success
              })
          }
          if (item.id === '2') {
            promptAction.showToast({
              message: "已经是最新版啦"
            })
          }
          if (item.id === '3') {
            router.pushUrl({
              url: 'pages/AboutPage',
            })
              .then(() => {
                // success
              })
          }
        })
        .backgroundColor($r('app.color.white'))
        .margin({
          left: $r('app.float.default_24'),
          right: $r('app.float.default_24')
        })
        .height($r('app.float.default_48'))
        .border({
          width: { bottom: $r('app.float.default_1') },
          color: $r('app.color.borderColor')
        })

      }, (item: InfoItem) => JSON.stringify(item));
    }
    .border({
      radius: {
        topLeft: $r('app.float.default_24'),
        topRight: $r('app.float.default_24')
      }
    })
    .backgroundColor($r('app.color.white'))
    .margin({ top: $r('app.float.default_24') })
    .padding({ top: $r('app.float.default_16') })
    .flexGrow(1)
    .clip(true)
  }
}