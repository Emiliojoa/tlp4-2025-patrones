
# Patrones de Diseño en TypeScript

## 1. Introducción a los Patrones de Diseño
Los patrones de diseño son soluciones probadas y documentadas para problemas recurrentes en el desarrollo de software. En lugar de reinventar la rueda, los desarrolladores pueden aplicar estos patrones para resolver problemas específicos de manera eficiente.

### Historia y Origen
El concepto de patrones de diseño proviene de la arquitectura, introducido al mundo de la programación por el libro *Design Patterns: Elements of Reusable Object-Oriented Software* escrito por Erich Gamma, Richard Helm, Ralph Johnson y John Vlissides (conocidos como la "Banda de los Cuatro").

### Clasificación General
- **Patrones Creacionales**: Se enfocan en la manera en que se crean los objetos.
- **Patrones Estructurales**: Tratan la forma en que los objetos y clases se organizan y relacionan entre sí.
- **Patrones Comportamentales**: Definen cómo los objetos se comunican e interactúan para realizar tareas específicas.

## 2. Patrón Singleton (Clasificación: Creacional)
El patrón **Singleton** asegura que una clase tenga solo una única instancia y proporciona un punto de acceso global a dicha instancia. Este patrón es útil cuando se necesita un único objeto que coordine acciones en todo el sistema, como la gestión de una base de datos o de un administrador de configuración.

### Ventajas
- Control total sobre los recursos compartidos.
- Previene la creación innecesaria de objetos.

### Desventajas
- Puede llevar a problemas si no se gestiona correctamente en entornos concurrentes o distribuidos.
- Dificulta las pruebas unitarias debido a su dependencia global.

### Ejemplo aplicado en TypeScript (Gestión de salarios):
```typescript
class AdministradorDeNominas {
    private static instancia: AdministradorDeNominas;
    private salarios: { [empleado: string]: number } = {};

    private constructor() {}

    public static obtenerInstancia(): AdministradorDeNominas {
        if (!AdministradorDeNominas.instancia) {
            AdministradorDeNominas.instancia = new AdministradorDeNominas();
        }
        return AdministradorDeNominas.instancia;
    }

    public registrarSalario(empleado: string, salario: number): void {
        this.salarios[empleado] = salario;
    }

    public obtenerSalario(empleado: string): number {
        return this.salarios[empleado];
    }
}

// Uso del Singleton
const adminNominas = AdministradorDeNominas.obtenerInstancia();
adminNominas.registrarSalario('Juan', 50000);
console.log(adminNominas.obtenerSalario('Juan')); // 50000
```

## 3. Patrón Factory Method (Clasificación: Creacional)
El patrón **Factory Method** define una interfaz para crear objetos, pero permite a las subclases decidir qué clase instanciar. En lugar de crear los objetos directamente con `new`, las clases delegan la creación a una fábrica.

### Ventajas
- Separa la lógica de creación de objetos, promoviendo el principio de responsabilidad única.
- Facilita la adición de nuevos tipos de productos sin modificar el código existente.

### Desventajas
- Puede aumentar la complejidad del código debido a la creación de múltiples clases de productos y fábricas.

### Ejemplo aplicado en TypeScript (Ventas de productos):
```typescript
interface Producto {
    calcularPrecio(): number;
}

class ProductoFisico implements Producto {
    private costo: number;

    constructor(costo: number) {
        this.costo = costo;
    }

    calcularPrecio(): number {
        return this.costo + 10; // Costo más una tarifa de envío fija
    }
}

class ProductoDigital implements Producto {
    private costo: number;

    constructor(costo: number) {
        this.costo = costo;
    }

    calcularPrecio(): number {
        return this.costo; // No tiene costo de envío
    }
}

class Tienda {
    public crearProducto(tipo: string, costo: number): Producto {
        if (tipo === 'fisico') {
            return new ProductoFisico(costo);
        } else if (tipo === 'digital') {
            return new ProductoDigital(costo);
        }
        throw new Error('Tipo de producto no reconocido');
    }
}

// Uso del Factory Method
const tienda = new Tienda();
const producto1 = tienda.crearProducto('fisico', 100);
const producto2 = tienda.crearProducto('digital', 50);
console.log(producto1.calcularPrecio()); // 110
console.log(producto2.calcularPrecio()); // 50
```

## 4. Patrón Observer (Clasificación: Comportamental)
El patrón **Observer** define una relación uno a muchos entre objetos. Cuando un objeto cambia de estado, todos los objetos dependientes (observadores) son notificados y actualizados automáticamente. Es comúnmente usado en sistemas donde los cambios de un estado deben reflejarse en múltiples componentes, como sistemas de notificaciones o interfaces de usuario dinámicas.

### Ventajas
- Fomenta la reutilización y la flexibilidad, ya que los observadores no dependen directamente de la fuente.
- Facilita la notificación automática y dinámica de cambios.

### Desventajas
- Puede generar muchos eventos y notificaciones innecesarias si no se gestiona bien.
- Complejidad en el manejo de dependencias circulares si no se implementa correctamente.

### Ejemplo aplicado en TypeScript (Notificación de cambios en salarios):
```typescript
interface Observador {
    actualizar(salario: number): void;
}

class Empleado implements Observador {
    constructor(private nombre: string) {}

    actualizar(salario: number): void {
        console.log(`${this.nombre} ha sido notificado. Nuevo salario: ${salario}`);
    }
}

class AdministradorDeSalarios {
    private observadores: Observador[] = [];
    private salario: number = 0;

    agregarObservador(observador: Observador): void {
        this.observadores.push(observador);
    }

    eliminarObservador(observador: Observador): void {
        this.observadores = this.observadores.filter(obs => obs !== observador);
    }

    cambiarSalario(nuevoSalario: number): void {
        this.salario = nuevoSalario;
        this.notificarObservadores();
    }

    private notificarObservadores(): void {
        this.observadores.forEach(obs => obs.actualizar(this.salario));
    }
}

// Uso del patrón Observer
const adminSalarios = new AdministradorDeSalarios();
const empleado1 = new Empleado('Carlos');
const empleado2 = new Empleado('Ana');

adminSalarios.agregarObservador(empleado1);
adminSalarios.agregarObservador(empleado2);

adminSalarios.cambiarSalario(60000);
// Carlos ha sido notificado. Nuevo salario: 60000
// Ana ha sido notificado. Nuevo salario: 60000
```

## 5. Patrón Adaptador (Clasificación: Estructural)
El patrón **Adaptador** permite que dos interfaces incompatibles trabajen juntas. Es un patrón estructural porque se ocupa de la forma en que los objetos y clases interactúan.

### Ventajas
- Permite que sistemas antiguos funcionen con nuevas clases sin modificar su código.
- Facilita la reutilización de clases con interfaces incompatibles.

### Desventajas
- Añade complejidad adicional al sistema al introducir otra capa de abstracción.

### Ejemplo aplicado en TypeScript (Ventas):
```typescript
// Clase antigua para calcular descuentos
class DescuentoAntiguo {
    public calcularDescuento(precio: number): number {
        return precio * 0.9; // 10% de descuento
    }
}

// Nueva clase con una interfaz diferente
class NuevoDescuento {
    public aplicarDescuento(precio: number): number {
        return precio * 0.85; // 15% de descuento
    }
}

// Adaptador para hacer que NuevoDescuento funcione como DescuentoAntiguo
class AdaptadorDescuento {
    private nuevoDescuento: NuevoDescuento;

    constructor() {
        this.nuevoDescuento = new NuevoDescuento();
    }

    public calcularDescuento(precio: number): number {
        // Se adapta el método de la nueva clase a la interfaz antigua
        return this.nuevoDescuento.aplicarDescuento(precio);
    }
}

// Uso del patrón Adaptador
const adaptador = new AdaptadorDescuento();
console.log(adaptador.calcularDescuento(100)); // 85
```

