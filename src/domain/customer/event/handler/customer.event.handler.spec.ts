import { v4 } from "uuid";
import EventDispatcher from "../../../@shared/event/event-dispatcher";
import { CustomerAddressChanged } from "../customer-address-changed.event";
import { CustomerCreated } from "../customer-created.event";
import { SendConsoleLogAddress } from "./send-console-log-address.handler";
import { SendConsoleLog1 } from "./send-console-log1.handler";
import { SendConsoleLog2 } from "./send-console-log2.handler";
import Address from "../../value-object/address";

describe("Customer events tests", () => {
  it("should log two messages on create customer", () => {
    const eventDispatcher = new EventDispatcher();

    const createEvent1 = new SendConsoleLog1();
    const createEvent2 = new SendConsoleLog2();

    const spyEventHandler1 = jest.spyOn(createEvent1, "handle");
    const spyEventHandler2 = jest.spyOn(createEvent2, "handle");

    eventDispatcher.register(CustomerCreated.name, createEvent1);
    eventDispatcher.register(CustomerCreated.name, createEvent2);

    const customerCreated = new CustomerCreated(undefined);

    eventDispatcher.notify(customerCreated);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should log customer address change", () => {
    const eventDispatcher = new EventDispatcher();

    const createEvent = new SendConsoleLogAddress();

    const spyEventHandler = jest.spyOn(createEvent, "handle");

    eventDispatcher.register(CustomerAddressChanged.name, createEvent);

    const customerAddressChanged = new CustomerAddressChanged({
      id: v4(),
      name: "Test Test",
      address: new Address("Test", 999, "Test", "Test"),
    });

    eventDispatcher.notify(customerAddressChanged);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
