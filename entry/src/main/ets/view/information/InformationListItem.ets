import { CommonConstants as Const } from '../../common/constants/CommonConstants';

@Styles
function listItemStyle() {
  .backgroundColor($r('app.color.white'))
  .height(Const.DEFAULT_56)
  .borderRadius(Const.DEFAULT_10)
  .padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 })
}
@Component
export struct NameSetItem {
  build() {
    Row() {
      Row() {
        Text('昵称')
          .fontSize(20)
          .fontColor($r('app.color.titleColor'))
      }
      Image($r('app.media.ic_right_grey'))
        .width(8)
        .height(16)
    }
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween)
    .padding({ left: 12, right: 12 })
  }
}
@Component
export struct GenderSetItem {
  build() {
    Row() {
      Row() {
        Text('性别')
          .fontSize(20)
          .fontColor($r('app.color.titleColor'))
      }
      Image($r('app.media.ic_right_grey'))
        .width(8)
        .height(16)
    }
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween)
    .padding({ left: 12, right: 12 })
  }
}
@Component
export struct BirthSetItem {
  build() {
    Row() {
      Row() {
        Text('出生日期')
          .fontSize(20)
          .fontColor($r('app.color.titleColor'))
      }
      Image($r('app.media.ic_right_grey'))
        .width(8)
        .height(16)
    }
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween)
    .padding({ left: 12, right: 12 })
  }
}
@Component
export struct HeightSetItem {
  build() {
    Row() {
      Row() {
        Text('身高')
          .fontSize(20)
          .fontColor($r('app.color.titleColor'))
      }
      Image($r('app.media.ic_right_grey'))
        .width(8)
        .height(16)
    }
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween)
    .padding({ left: 12, right: 12 })
  }
}
@Component
export struct WeightSetItem {
  build() {
    Row() {
      Row() {
        Text('体重')
          .fontSize(20)
          .fontColor($r('app.color.titleColor'))
      }
      Image($r('app.media.ic_right_grey'))
        .width(8)
        .height(16)
    }
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween)
    .padding({ left: 12, right: 12 })
  }
}




