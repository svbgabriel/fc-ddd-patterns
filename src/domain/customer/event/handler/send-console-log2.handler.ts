import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerCreated } from "../customer-created.event";

export class SendConsoleLog2 implements EventHandlerInterface<CustomerCreated> {

    handle(event: CustomerCreated) {
        console.log("Esse é o segundo console.log do evento: CustomerCreated");
    }
}
