
🏆 Práctica Individual Frontend – “¿Y si sí me lo gané?”

Entrega Mayo 21 - 15% 

# 📌 Contexto del proyecto

En muchas ocasiones las personas participan en rifas, loterías, sorteos o compran boletas de diferentes maneras:

* En la calle
* A familiares o amigos
* En supermercados o centros comerciales (sorteos)
* Por internet
* En eventos o festivales
* Porque soñaron un número y decidieron jugarlo

El problema es que muchas veces las personas:

* olvidan qué número jugaron,
* no recuerdan cuándo era el sorteo,
* pierden la boleta,
* o incluso nunca revisan si ganaron.

Después de varios días aparece la típica frase:
“¿Y si sí me lo gané y nunca revisé?”

La idea de esta práctica es desarrollar una aplicación web moderna que permita a cada usuario registrar y administrar todas sus boletas, rifas, loterías y sorteos en un solo lugar.

La aplicación deberá permitir que los usuarios:

* creen una cuenta,
* inicien sesión,
* registren sus boletas/ sorteos ,
* consulten sus boletas/ sorteos,
* recuerden fechas de sorteos,

Tener una mejor organización de toda la información relacionada con juegos de azar y sorteos.


# 🎯 Objetivo de la práctica

Desarrollar el frontend completo de una aplicación web conectada a una API REST ya construida por el docente.

El objetivo es aplicar todos los conocimientos vistos durante el curso:

- HTML semántico
- CSS moderno y responsive
- TypeScript
- React / nextjs
- Manejo de estado
- Consumo de APIs REST
- Componentización
- Formularios
- Manejo de errores
- Routing
- Persistencia de sesión (localstorage, sesionstorage, cookies)
- Buenas prácticas de desarrollo web (clean architecture)

# 📱 Requisitos funcionales mínimos

1. 🔐 Autenticación

La aplicación debe tener:

- Registro de usuario
    - Nombre
    - Email
    - Contraseña
- Inicio de sesión (Login)
- Manejo de token JWT
- Persistencia de sesión
- Cierre de sesión / Botón logout


2. 🎟 Gestión de boletas / sorteos

Cada usuario debe poder:

- Crear registros de los siguientes tipos de juegos:
Cada registro debe contener mínimo:
    - Nombre del sorteo
    - Número jugado (Opcional)
    - Fecha del sorteo
    - Valor apostado (opcional)
    - Lugar donde se compró
    - Tipo de juego: Lotería / Rifa / Sorteo / Boleta / Juegos ocasional
    - Estado:
        - Pendiente
        - Ganado
        - Perdido
    - Notas adicionales: (Por ejemplo el premio a ganar)

# CRUD completo

✅ Crear registros boletas / sorteos
✅ Visualizar registros
✅ Editar registros
✅ Eliminar registros

3. 📋 Dashboard principal
- cantidad de juegos registrados
- próximos sorteos
- juegos pendientes
- historial (todas las boletas / sorteos)


4. Página del administrador

Filtros y búsqueda de premios / sorteos

La página del administrador debe permitir:

- buscar por número
- buscar por nombre
- filtrar por estado
- filtrar por tipo de juego
- paginación 

## Validaciones generales
- campos vacíos
- formato email
- fechas válidas
- números inválidos

Mostrar errores visualmente.