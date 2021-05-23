import {SharedModule} from "../shared/shared.module";
import {NgModule} from "@angular/core";
import {ChatComponent} from "./chat.component";
import {ChatRoutingModule} from "./chat-routing.module";

const COMPONENTS = [
  ChatComponent
];
const MODULES = [
  SharedModule,
  ChatRoutingModule
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS, MODULES],
  providers: [],
})
export class ChatModule {

}
