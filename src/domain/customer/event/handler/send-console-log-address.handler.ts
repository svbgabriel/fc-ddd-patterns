import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerAddressChanged } from "../customer-address-changed.event";

export class SendConsoleLogAddress
  implements EventHandlerInterface<CustomerAddressChanged>
{
  handle(event: CustomerAddressChanged) {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${
        event.eventData.name
      } alterado para: ${event.eventData.address.toString()}`
    );
  }
}
