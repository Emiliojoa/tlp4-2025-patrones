import { IPublisher } from "../interfaces/IPublisher";
import { ISubscriber } from "../interfaces/ISubscriber";


export class Profesor implements IPublisher {
    subscribers: ISubscriber[] = [];
    constructor(public nombre: string) {}
    subscribe(subscriber: ISubscriber): void {
        if (!this.subscribers.includes(subscriber)) {
            this.subscribers.push(subscriber);
            console.log(` Estudiante suscrito al profesor ${this.nombre}`);
        }
    }

    unsubscribe(subscriber: ISubscriber): void {
        const index = this.subscribers.indexOf(subscriber);
        if (index > -1) {
            this.subscribers.splice(index, 1);
            console.log(` Estudiante desuscrito del profesor ${this.nombre}`);
        }
    }

    publish(tarea: any): void {
        console.log(`\n El profesor ${this.nombre} publica una nueva tarea:`);
        console.log(`Tarea: ${JSON.stringify(tarea)}`);
        console.log(`Notificando a ${this.subscribers.length} estudiante`);
        
        this.subscribers.forEach(subscriber => {
            subscriber.update(tarea);
        });
    }

    getSubscribersCount(): number {
        return this.subscribers.length;
    }
}
