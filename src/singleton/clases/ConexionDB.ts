import { IConexionDB } from "../interfaces/IConexionDB";

export class ConexionDB implements IConexionDB {
    private static instance: ConexionDB;
    private conectado: boolean = true;
    
    private readonly host: string = "localhost";
    private readonly puerto: number = 1111;
    private readonly usuario: string = "EmiliJJoa";
    private readonly baseDatos: string = "MIdatabase";


    private constructor() {
        console.log("Inicializando configuración de base de datos");
    }

  
    public static getInstance(): ConexionDB {
        if (!ConexionDB.instance) {
            ConexionDB.instance = new ConexionDB();
            console.log("Nueva instancia de ConexionDB creada");
        } else {
            console.log("Reutilizando instancia existente de ConexionDB");
        }
        return ConexionDB.instance;
    }

    
    public conectar(): void {
        if (this.conectado) {
            console.log(" Ya existe una conexión activa a la base de datos");
            return;
        }

        console.log("Estableciendo conexión a la base de datos ");
        console.log(`Host: ${this.host}:${this.puerto}`);
        console.log(`Usuario: ${this.usuario}`);
        console.log(`Base de datos: ${this.baseDatos}`);
    }

    public desconectar(): void {
        if (!this.conectado) {
            console.log(" No hay conexión activa para cerrar");
            return;
        }

        console.log(" Cerrando conexión a la base de datos...");
        this.conectado = false;
        console.log(" Conexión a la base de datos cerrada");
    }


    public estaConectado(): boolean {
        return this.conectado;
    }


    public obtenerInfoConexion() {
        return {
            host: this.host,
            puerto: this.puerto,
            usuario: this.usuario,
            baseDatos: this.baseDatos
        };
    }


    public async ejecutarConsulta(consulta: string): Promise<any[]> {
        if (!this.conectado) {
            throw new Error(" No hay conexión a la base de datos, conecte primero ");
        }

        console.log(` Ejecutando consulta: ${consulta}`);
        
        
        if (consulta.toLowerCase().includes("inventario")) {
            return [
                { id: 1, producto: "Laptop Dell", cantidad: 15, precio: 899.99 },
                { id: 2, producto: "Mouse Logitech", cantidad: 50, precio: 29.99 },
                { id: 3, producto: "Teclado Mecánico", cantidad: 25, precio: 79.99 }
            ];
        }
        
        if (consulta.toLowerCase().includes("usuarios")) {
            return [
                { id: 1, nombre: "Admin", email: "admin@inventario.com" },
                { id: 2, nombre: "Usuario1", email: "user1@inventario.com" }
            ];
        }
        
        return [{ mensaje: "Consulta ejecutada exitosamente" }];
    }
    
    public obtenerIdInstancia(): string {
        return `ConexionDB_${this.host}_${this.puerto}_${Date.now()}`;
    }
}
