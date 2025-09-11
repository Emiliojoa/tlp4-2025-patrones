export interface IConexionDB {
    conectar(): void;
    desconectar(): void;
    estaConectado(): boolean;
    obtenerInfoConexion(): {
        host: string;
        puerto: number;
        usuario: string;
        baseDatos: string;
    };
    ejecutarConsulta(consulta: string): Promise<any[]>;
}
