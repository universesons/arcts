import { router } from '@kit.ArkUI';

// Index.ets

import InformationList from '../view/information/InformationListComponent';
import personInfo from '../viewmodel/PersonInfo';

@Entry
@Component
struct Information {
  @State userInfo: personInfo = router.getParams() as personInfo;

  build() {
    Navigation() {
      RelativeContainer() {
        InformationList({ userInfo: this.userInfo })
        Button("返回")
          .width(200)
          .margin({ bottom: 40 })
          .onClick(() => {
            router.back()
          })
          .alignRules({
            bottom: { anchor: "__container__", align: VerticalAlign.Bottom },
            middle: { anchor: "__container__", align: HorizontalAlign.Center },
          })
      }
      .width('100%')
    }
    .title('个人信息编辑')
  }
}