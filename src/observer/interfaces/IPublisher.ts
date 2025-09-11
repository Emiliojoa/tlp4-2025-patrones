import { ISubscriber } from "./ISubscriber";

export interface IPublisher{
    readonly subscribers: ISubscriber[]
    subscribe(subscriber: ISubscriber): void;
    unsubscribe(subscriber: ISubscriber): void;
    publish(data: any): void;
}