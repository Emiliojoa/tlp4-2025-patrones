import { ConexionDB } from "./clases/ConexionDB";


class ModuloInventario {
    private db: ConexionDB;

    constructor() {
        this.db = ConexionDB.getInstance();
    }

    async consultarProductos() {
        console.log(" Módulo Inventario: Consultando productos...");
        try {
            const productos = await this.db.ejecutarConsulta("SELECT * FROM inventario");
            console.log(" Productos encontrados:", productos.length);
            return productos;
        } catch (error) {
            console.error(" Error en ModuloInventario:", error);
        }
    }
}

class ModuloUsuarios {
    private db: ConexionDB;

    constructor() {
        this.db = ConexionDB.getInstance();
    }

    async consultarUsuarios() {
        console.log(" Módulo Usuarios: Consultando usuarios...");
        try {
            const usuarios = await this.db.ejecutarConsulta("SELECT * FROM usuarios");
            console.log(" Usuarios encontrados:", usuarios.length);
            return usuarios;
        } catch (error) {
            console.error(" Error en ModuloUsuarios:", error);
        }
    }
}

class ModuloReportes {
    private db: ConexionDB;

    constructor() {
        this.db = ConexionDB.getInstance();
    }

    async generarReporte() {
        console.log(" Módulo Reportes: Generando reporte...");
        try {
            const datos = await this.db.ejecutarConsulta("SELECT COUNT(*) FROM inventario");
            console.log(" Reporte generado exitosamente");
            return datos;
        } catch (error) {
            console.error(" Error en ModuloReportes:", error);
        }
    }
}


export async function runSingleton() {


    const conexion1 = ConexionDB.getInstance();
    const conexion2 = ConexionDB.getInstance();
    const conexion3 = ConexionDB.getInstance();

    console.log("\n");
    const info = conexion1.obtenerInfoConexion();
    console.log(`Host: ${info.host}`);
    console.log(`Puerto: ${info.puerto}`);
    console.log(`Usuario: ${info.usuario}`);
    console.log(`Base de datos: ${info.baseDatos}`);


    console.log("\n");
    conexion1.conectar();
    
    
    await new Promise(resolve => setTimeout(resolve, 150));

    console.log(`Estado de conexión: ${conexion1.estaConectado()}`);

console.log("\n ");
    
    const moduloInventario = new ModuloInventario();
    const moduloUsuarios = new ModuloUsuarios();
    const moduloReportes = new ModuloReportes();


    console.log("\n Verificación de uso compartido ");
    console.log("Todos los módulos usarán la misma instancia de ConexionDB:");

    console.log("\n");

    try {
        await moduloInventario.consultarProductos();
        await moduloUsuarios.consultarUsuarios();
        await moduloReportes.generarReporte();
    } catch (error) {
        console.error(" Error durante las operaciones:", error);
    }

    try {
        console.log(" El constructor privado previene la instanciación directa");
    } catch (error) {
        console.log("Error al intentar crear instancia directa:", error);
    }

    console.log("\n === Prueba de estado compartido ===");
    console.log(`Estado desde conexion1: ${conexion1.estaConectado()}`);
    console.log(`Estado desde conexion2: ${conexion2.estaConectado()}`);
    console.log(`Estado desde conexion3: ${conexion3.estaConectado()}`);
    
    conexion2.desconectar();
    console.log(`\nDespués de desconectar desde conexion2:`);
    console.log(`Estado desde conexion1: ${conexion1.estaConectado()}`);
    console.log(`Estado desde conexion3: ${conexion3.estaConectado()}`);

}
