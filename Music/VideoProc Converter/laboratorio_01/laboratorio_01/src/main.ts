
//selecionando elementos
const btnSubmit = document.querySelector('.todo-btn') as HTMLButtonElement;
const inputTodo = document.querySelector('.todo-input') as HTMLInputElement;
const formTodo = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.querySelector('.todo-list') as HTMLLIElement;
const btnDeleteAll = document.querySelector('.todo-delete-all') as HTMLButtonElement;

const handleSubmit = (e: Event) =>{
    e.preventDefault();
    const title = (document.querySelector('.todo-title') as HTMLInputElement).value;
    const dueDate = (document.querySelector('.todo-due-date') as HTMLInputElement).value;
    const description = (document.querySelector('.todo-description') as HTMLInputElement).value;

    //criando um novo objeto lembrete
    const newTodo: Todo = {
        id: Date.now(),
        title: title,
        todo: inputTodo.value,
        completed: false,
        dueDate: dueDate,
        description: description,
        insertionDate: new Date().toLocaleDateString()
    };

    //salvando no localstorage
    todos.push(newTodo);
    saveTodos();

    //inserindo novo lembrete fn
    appendTodo(newTodo);
    

    //redefinindo input
    inputTodo.value = "";
};

interface Todo{
    id:number,
    title: string,
    todo:string,
    completed:boolean,
    insertionDate: string,
    dueDate?: string,
    description?: string
};
//array de objetos lembrete
const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');

console.log(todos);
window.addEventListener('DOMContentLoaded', () => {
    todos.forEach(todo => appendTodo(todo));
});

//salvando
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

//adicioando funcao de lembrete
const appendTodo = (newTodo: Todo) =>{
    const newLi = document.createElement('li');
    newLi.classList.add('list-group-item');

    const checkB = document.createElement('input');
    checkB.type = "checkbox";
    checkB.checked = newTodo.completed;

    const todoTitle = document.createElement('h5');
    todoTitle.textContent = newTodo.title;
    todoTitle.classList.add('mb-1');

    const dueDateSpan = document.createElement('span');
    const dueDate = new Date(newTodo.dueDate || ''); // Criando um objeto Date com a data de vencimento
    const formattedDueDate = `${dueDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })} às ${dueDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`; // aqui eu bati cabeça kkk
    dueDateSpan.textContent = `Data: ${formattedDueDate || 'Não especificado'}`;
    dueDateSpan.classList.add('me-2', 'text-muted');

    const descriptionPara = document.createElement('p');
    descriptionPara.textContent = `Descrição: ${newTodo.description || 'Não especificado'}`;
    descriptionPara.classList.add('mb-1');

    

    //adicionando evento de caixa de selecao
    checkB.onchange = () =>{
        newTodo.completed = checkB.checked;
        saveTodos();
    };
    newLi.append(checkB, todoTitle, dueDateSpan, descriptionPara);
    todoList?.prepend(newLi);

    

    // Adicionando evento de edição ao título
    todoTitle.onclick = () =>{
        const modalTitleInput = document.querySelector('.todo-title-edit') as HTMLInputElement;
        const modalDueDateInput = document.querySelector('.todo-due-date-edit') as HTMLInputElement;
        const modalDescriptionInput = document.querySelector('.todo-description-edit') as HTMLInputElement;
    
        modalTitleInput.value = newTodo.title;
        modalDueDateInput.value = newTodo.dueDate || '';
        modalDescriptionInput.value = newTodo.description || '';

        const saveChangesBtn = document.querySelector('.btn-save-changes') as HTMLButtonElement;

        saveChangesBtn.onclick = () =>{
            newTodo.title = modalTitleInput.value;
            newTodo.dueDate = modalDueDateInput.value;
            newTodo.description = modalDescriptionInput.value;

            saveTodos();
            newLi.remove();
            appendTodo(newTodo);
        }

    }
};

formTodo.addEventListener('submit', e => handleSubmit(e));

//deletando lembretes
const clearCompletedTodos = () => {
    // Filtra apenas os todos que não estão marcados como concluídos
    const activeTodos = todos.filter(todo => !todo.completed);

    // Atualiza a lista de todos com os todos ativos
    todos.splice(0, todos.length, ...activeTodos);
    saveTodos();
    todoList.innerHTML = '';
    activeTodos.forEach(todo => appendTodo(todo));
};

// Adiciona um evento de clique ao botão de deletar lembretes concluídos
btnDeleteAll.onclick = () => clearCompletedTodos();

