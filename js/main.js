import { Todo } from "./clases/Todo.js";


class AppToDos {
    todoList = [
        {id: Math.ceil(Math.random() *1000000), titulo: 'Estudiar JavaScript', prioridad: 'urgente'},
        {id: Math.ceil(Math.random() *1000000), titulo: 'Dormir', prioridad: 'intermedia'},
        {id: Math.ceil(Math.random() *1000000), titulo: 'Hacer los deberes', prioridad: 'intermedia'},
        {id: Math.ceil(Math.random() *1000000), titulo: 'Salir a comer', prioridad: 'normal'},
    ];
    form = document.querySelector('#addTodoForm');
    listContainer = document.querySelector('.list-todo');
    searchForm = document.querySelector('#searchTodoForm');
    letterCount = '';
    
    constructor(){
        this.form.addEventListener('submit', (e) => this.createTodo(e));
        this.searchForm.searchPriority.addEventListener('click', () => this.searchPriority());
        this.searchForm.searchTodoText.addEventListener('keydown', (e) => this.searchText(e));
        this.printAllLocal();
    }

    printAllLocal(){
        const getLocal = localStorage.getItem('TODOS');

        if(!getLocal) {
            this.printAllTodos();
            return;
        }

        const parseLocal = JSON.parse(getLocal);
        this.todoList = parseLocal;
        this.printAllTodos();
    }
    
    formInfo() {
        const valueToDo = this.form.todo.value.trim();
        const priority = this.form.priority.value;
        return {valueToDo, priority}
    }

    updateLocalStorage(){
        const localString = JSON.stringify(this.todoList);
        localStorage.setItem('TODOS', localString);
    }

    createTodo(e) {
        e.preventDefault();

        const {valueToDo, priority} = this.formInfo();

        if(!valueToDo) {
            return;
        }

        this.addToDo(valueToDo, priority);
        this.updateLocalStorage();

        this.form.reset();
    }

    addToDo(titulo, prioridad){
        const newTodo = new Todo(titulo, prioridad);
        const printTodo = this.printTodo(newTodo.id, titulo, prioridad);

        this.todoList.push(newTodo);
        this.listContainer.append(printTodo);
        this.printAllTodos();
        this.searchForm.reset();
    }

    removeTodo(id){
        this.todoList = this.todoList.filter(todo => {
            return todo.id !== id
        })

        this.updateLocalStorage();
        this.printAllTodos();
    }

    printAllTodos(){
        this.listContainer.innerHTML = '';
        
        this.todoList.forEach(todo => {
            const {id, titulo, prioridad} = todo;
            const div = this.printTodo(id, titulo, prioridad)
            this.listContainer.append(div);
        })
        this.updateLocalStorage();
    }

    printTodo(id, titulo, prioridad) {
        const div = document.createElement('div');
        const p = document.createElement('p');
        const btn = document.createElement('button');

        btn.addEventListener('click', () => this.removeTodo(id));

        div.className = 'todo-item';
        btn.className = 'btn-delete';

        p.innerHTML = titulo;
        btn.innerHTML = 'Eliminar';
        
        if(prioridad === 'urgente') {
            div.classList.add('urgente')
        } else if(prioridad === 'intermedia') {
            div.classList.add('intermedia')
        } else if(prioridad === 'normal') {
            div.classList.add('normal')
        } else if(prioridad === 'diaria') {
            div.classList.add('diaria')
        }

        div.append(p, btn);
        return div;
    }

    searchPriority() {
        const valueSearch = this.searchForm.searchPriority.value;
        if(valueSearch !== 'prioridad') {
            this.listContainer.innerHTML = '';
        }
        this.todoList.forEach(todo => {
            const {id, titulo, prioridad} = todo;
            if(todo.prioridad === valueSearch){
                let searchTodo = this.printTodo(id, titulo, prioridad);
                this.listContainer.append(searchTodo);
            } else if (valueSearch === 'todas') {
                let searchTodo = this.printTodo(id, titulo, prioridad);
                this.listContainer.append(searchTodo);
            }
        })
    }

    searchText(e) {
        this.searchForm.searchPriority.value = 'prioridad';
        
        if(e.key === 'Backspace' || e.key === 'Delete'){
            this.letterCount = this.letterCount.substring(0, this.letterCount.length - 1);
        }else if(e.key === 'Enter'){
            e.preventDefault()
        } else {
            let keyLower = e.key.toLowerCase();
            this.letterCount += keyLower;
        }

        this.listContainer.innerHTML = '';
        this.todoList.forEach(todo => {
            const {id, titulo, prioridad} = todo;
            const titulos = todo.titulo.toLowerCase();
            let searchTodo = this.printTodo(id, titulo, prioridad);

            if (titulos.includes(this.letterCount)){
                this.listContainer.append(searchTodo);  
            } 
        })
    }
}


const initializate = new AppToDos();
