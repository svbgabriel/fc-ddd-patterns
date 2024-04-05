import EventInterface from "../../@shared/event/event.interface";

export class CustomerCreated implements EventInterface {
    readonly dataTimeOccurred: Date;
    readonly eventData: any;
    readonly eventVersion: number = 1;

    constructor(
        eventData: any
    ) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}
