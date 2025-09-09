import { SimpleHttpClient } from "./class/SimpleHttpClient";
import { FetchAdapter } from "./class/FetchAdapter";
import { AxiosAdapter } from "./class/AxiosAdapter";

export async function runAdapter() {

    const fetchAdapter = new FetchAdapter();
    const axiosAdapter = new AxiosAdapter();

    const httpClient = new SimpleHttpClient(fetchAdapter);

    try {
        const todo1 = await httpClient.get<any>("https://jsonplaceholder.typicode.com/todos/1");
        console.log("FETCHHHHHH");
        console.log(`   ID: ${todo1.id}`);
        console.log(`   UserID: ${todo1.userId}`);
        console.log(`   Tittle: ${todo1.title}`);
        console.log(`   Completed: ${todo1.completed}`);

        // Consultar más TODOs del mismo usuario (solo 3)
        const userTodos = await httpClient.get<any>(`https://jsonplaceholder.typicode.com/todos?userId=${todo1.userId}&_limit=3`);
        console.log(`\n✅ Otros TODOs del usuario ${todo1.userId} (con Fetch):`);
        userTodos.forEach((todo: any) => {
            console.log(`   ${todo.completed ? '✅' : '❌'} [${todo.id}] ${todo.title}`);
        });
    } catch (error) {
        console.error("❌ Error con FetchAdapter:", error);
    }

    console.log("\n🔄 Cambiando adapter a AxiosAdapter...\n");

    httpClient.setAdapter(axiosAdapter);

    console.log("📡 === Usando AxiosAdapter ===");
    try {
        const todo5 = await httpClient.get<any>("https://jsonplaceholder.typicode.com/todos/5");
        console.log("AXIOSSSSS")
        console.log(`   ID: ${todo5.id}`);
        console.log(`   UserID: ${todo5.userId}`);
        console.log(`   Tittle: ${todo5.title}`);
        console.log(`   Completed: ${todo5.completed  }`);

        const completedTodos = await httpClient.get<any>("https://jsonplaceholder.typicode.com/todos?completed=true&_limit=3");
        completedTodos.forEach((todo: any) => {
            console.log(`   ✅ [${todo.id}] ${todo.title} (Usuario: ${todo.userId})`);
        });
    } catch (error) {
        console.error("❌ Error con AxiosAdapter:", error);
    }


    try {
        const todoUrl = "https://jsonplaceholder.typicode.com/todos/1";
        const [fetchResult, axiosResult] = await Promise.all([
            fetchAdapter.get<any>(todoUrl),
            axiosAdapter.get<any>(todoUrl)
        ]);
        console.log("✅ Ambos adapters obtuvieron los mismos datos:");
        console.log(`   Fetch - ${JSON.stringify(fetchResult)}`);
        console.log(`   Axios - ${JSON.stringify(axiosResult)}`);
        console.log(`   Datos idénticos: ${JSON.stringify(fetchResult) === JSON.stringify(axiosResult) ? '✅' : '❌'}`);
    } catch (error) {
        console.error("❌ Error en comparación:", error);
    }
}
