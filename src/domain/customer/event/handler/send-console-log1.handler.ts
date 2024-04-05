import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerCreated } from "../customer-created.event";

export class SendConsoleLog1 implements EventHandlerInterface<CustomerCreated> {

    handle(event: CustomerCreated) {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }
}
