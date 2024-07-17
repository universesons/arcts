// Index.ets

import InformationList from '../view/information/InformationListComponent';

@Entry
@Component
struct Information {
  build() {
    Row() {
      Navigation() {
        Column() {
          InformationList()
        }
      }
    }
  }
}