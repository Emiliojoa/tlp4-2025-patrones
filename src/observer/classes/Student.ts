import { ISubscriber } from "../interfaces/ISubscriber";


export class Student implements ISubscriber {
    constructor(public nombre: string) {}

  
    update(tarea: any): void {
        console.log(`\n El alumno ${this.nombre} recibió una nueva tarea`);
        console.log(`   Título: ${tarea.titulo}`);
        console.log(`   Descripción: ${tarea.descripcion}`);
        console.log(`   Fecha límite: ${tarea.fechaLimite}`);
        console.log(`   ¡A trabajar! \n`);
    }
}
