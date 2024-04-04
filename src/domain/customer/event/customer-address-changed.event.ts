import EventInterface from "../../@shared/event/event.interface";

export class CustomerAddressChanged implements EventInterface {
  readonly dataTimeOccurred: Date;
  readonly eventVersion: number = 1;
  readonly eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
