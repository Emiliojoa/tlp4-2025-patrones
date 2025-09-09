import { Profesor } from "./classes/Profesor";
import { Student } from "./classes/Student";


export async function runObserver() {

    console.log("Un profesor publica tareas y los alumnos suscritos reciben notificaciones");

    const profesor = new Profesor("Femenia");
    console.log(`Creado profesor: ${profesor.nombre}\n`);


    const estudiantes = [
        new Student("Ortiz Emilio"),
        new Student("Ortega Marcelo"),
        new Student("Roa Lucianno"),
    ];

    estudiantes.forEach(estudiante => {
        console.log(` ${estudiante.nombre}`);
    });

    estudiantes.forEach(estudiante => {
        profesor.subscribe(estudiante);
    });

    console.log(` Total de estudiantes suscritos: ${profesor.getSubscribersCount()}`);

    
    const tarea1 = {
        titulo: "Proyecto Final: Aplicación con Patrones de Diseño",
        descripcion: "Implementar una aplicación que use al menos 3 patrones de diseño",
        fechaLimite: "2026-04-01", //referencia jdajsdja
        materia: "Ingeniería de Software"
    };
    
    profesor.publish(tarea1);


    console.log(` ${estudiantes[1].nombre} abandona el classrom y no recibirá más tareas`);
    profesor.unsubscribe(estudiantes[1]);
    
    console.log(` Total de estudiantes suscritos después de la baja: ${profesor.getSubscribersCount()}`);



    console.log(`${estudiantes[1].nombre} se reintegra a la clase...`);
    profesor.subscribe(estudiantes[1]);
    
    


    console.log(` Resumen final: ${profesor.getSubscribersCount()} estudiantes suscritos al profesor ${profesor.nombre}`);
}
