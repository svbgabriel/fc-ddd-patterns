import { Mediator } from "./domain/@shared/service/mediator";
import { CustomerCreated } from "./domain/customer/event/customer-created.event";
import { SendMailHandler } from "./domain/customer/event/handler/send-mail.handler";

const mediator = new Mediator();

const sendMailHandler = new SendMailHandler();

mediator.register(CustomerCreated.name, (event: CustomerCreated) => {
    sendMailHandler.handle(event)
})
