import { SimpleHttpClient } from "./class/SimpleHttpClient";
import { FetchAdapter } from "./class/FetchAdapter";
import { AxiosAdapter } from "./class/AxiosAdapter";

export async function runAdapter() {

    const fetchAdapter = new FetchAdapter();
    const axiosAdapter = new AxiosAdapter();

    const httpClient = new SimpleHttpClient(fetchAdapter);

    try {
        const todo1 = await httpClient.get<any>("https://jsonplaceholder.typicode.com/todos/1");
        console.log("\n FETCHHHHHH");
        console.log(`ID: ${todo1.id}`);
        console.log(`UserID: ${todo1.userId}`);
        console.log(`Tittle: ${todo1.title}`);
        console.log(`Completed: ${todo1.completed}`);

        console.log("\n")

 
        const userTodos = await httpClient.get<any>(`https://jsonplaceholder.typicode.com/todos?userId=${todo1.userId}&_limit=3`);
        console.log(`\n Otros TODOs del usuario ${todo1.userId} (con Fetch):`);
        userTodos.forEach((todo: any) => {
            console.log(`   ${todo.completed } ${todo.id} ${todo.title}`);
        console.log("\n")
        });
    } catch (error) {
        console.error(" Error con FetchAdapter:", error);
    }


    httpClient.setAdapter(axiosAdapter);


    try {
        const todo5 = await httpClient.get<any>("https://jsonplaceholder.typicode.com/todos/5");
        console.log("\nAXIOSSSSS");
        console.log(`ID: ${todo5.id}`);
        console.log(`UserID: ${todo5.userId}`);
        console.log(`Tittle: ${todo5.title}`);
        console.log(`Completed: ${todo5.completed}`);

        console.log("\n")

        const completedTodos = await httpClient.get<any>("https://jsonplaceholder.typicode.com/todos?completed=true&_limit=3");
        completedTodos.forEach((todo: any) => {
            console.log(` ${todo.id} ${todo.title} (Usuario: ${todo.userId})`);
        });
    } catch (error) {
        console.error("Error con AxiosAdapter:", error);
    }


    try {
        const todoUrl = "https://jsonplaceholder.typicode.com/todos/1";
        const [fetchResult, axiosResult] = await Promise.all([
            fetchAdapter.get<any>(todoUrl),
            axiosAdapter.get<any>(todoUrl)
        ]);
    } catch (error) {
        console.error("Error en comparación:", error);
    }


    try {
        httpClient.setAdapter(fetchAdapter);
        const newTodo = {
            title: 'Nuevo TODO desde Fetch',
            body: 'Este TODO fue creado usando FetchAdapter',
            userId: 1,
            completed: false
        };
        
        const createdTodoFetch = await httpClient.post<any>("https://jsonplaceholder.typicode.com/posts", newTodo);
        console.log("FETCHHHHHH");
        console.log(`ID  ${createdTodoFetch.id}`);
        console.log(`userId ${createdTodoFetch.userId}`);
        console.log(`Tittle: ${createdTodoFetch.title}`);
        console.log(`Completed: ${createdTodoFetch.completed}`);


        httpClient.setAdapter(axiosAdapter);
        const anotherTodo = {
            title: 'Nuevo TODO desde Axios',
            body: 'Este TODO fue creado usando AxiosAdapter',
            userId: 1,
            completed: false
        };
        console.log("\n")

        
        const createdTodoAxios = await httpClient.post<any>("https://jsonplaceholder.typicode.com/posts", anotherTodo);
        console.log("AXIOSSS");
        console.log(`ID  ${createdTodoAxios.id}`);
        console.log(`userId ${createdTodoAxios.userId}`);
        console.log(`Tittle: ${createdTodoAxios.title}`);
        console.log(`Completed: ${createdTodoAxios.completed}`);
    } catch (error) {
        console.error("Error en POST:", error);
    }
}
