class Todo {
    id = Math.ceil(Math.random() *1000000)

    constructor(titulo, prioridad){
        this.titulo = titulo,
        this.prioridad = prioridad
    }
}

export {Todo}