import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerCreated } from "../customer-created.event";

export class SendMailHandler implements EventHandlerInterface<CustomerCreated> {

    handle(event: CustomerCreated) {
        //envio do email
    }
}
