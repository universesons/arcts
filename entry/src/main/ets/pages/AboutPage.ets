@Entry
@Component
struct AboutPage {
  @State message: string = '青云修仙队 Ver1.0.0';

  build() {
    RelativeContainer() {
      Text(this.message)
        .id('AboutPageHelloWorld')
        .fontSize(50)
        .fontWeight(FontWeight.Bold)
        .alignRules({
          center: { anchor: '__container__', align: VerticalAlign.Center },
          middle: { anchor: '__container__', align: HorizontalAlign.Center }
        })
    }
    .height('100%')
    .width('100%')
  }
}