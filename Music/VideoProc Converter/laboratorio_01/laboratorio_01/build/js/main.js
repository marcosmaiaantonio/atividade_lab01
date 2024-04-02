"use strict";
// Selecionando elementos
const btnSubmit = document.querySelector('.todo-btn');
const inputTodo = document.querySelector('.todo-input');
const formTodo = document.querySelector('.todo-form');
const todoList = document.querySelector('.todo-list');
const btnDeleteAll = document.querySelector('.todo-delete-all');
// Adicione a variável global para armazenar o todo atualmente em edição
let currentEditingTodo = null;
// Função para lidar com o envio do formulário
const handleSubmit = (e) => {
    e.preventDefault();
    const title = document.querySelector('.todo-title').value;
    const dueDate = document.querySelector('.todo-due-date').value;
    const description = document.querySelector('.todo-description').value;
    // Criando um novo objeto lembrete
    const newTodo = {
        id: Date.now(),
        title: title,
        todo: inputTodo.value,
        completed: false,
        dueDate: dueDate,
        description: description,
        insertionDate: new Date().toLocaleDateString()
    };
    // Salvando no localStorage
    todos.push(newTodo);
    saveTodos();
    // Inserindo novo lembrete na lista
    appendTodo(newTodo);
    // Redefinindo input
    inputTodo.value = "";
};
// Array de objetos lembrete
const todos = JSON.parse(localStorage.getItem('todos') || '[]');
console.log(todos);
window.addEventListener('DOMContentLoaded', () => {
    todos.forEach(todo => appendTodo(todo));
});
// Função para salvar os lembretes no localStorage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};
// Função para adicionar um lembrete na lista
const appendTodo = (newTodo) => {
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
    const formattedDueDate = `${dueDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })} às ${dueDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    dueDateSpan.textContent = `Data: ${formattedDueDate || 'Não especificado'}`;
    dueDateSpan.classList.add('me-2', 'text-muted');
    const descriptionPara = document.createElement('p');
    descriptionPara.textContent = `Descrição: ${newTodo.description || 'Não especificado'}`;
    descriptionPara.classList.add('mb-1');
    // Adicionando evento de caixa de seleção
    checkB.onchange = () => {
        newTodo.completed = checkB.checked;
        saveTodos();
    };
    newLi.append(checkB, todoTitle, dueDateSpan, descriptionPara);
    todoList === null || todoList === void 0 ? void 0 : todoList.prepend(newLi);
    // Adicionando evento de edição ao título
    todoTitle.onclick = () => {
        // Definindo o todo atualmente em edição como o todo passado para a função appendTodo
        currentEditingTodo = newTodo;
        // Preenchendo os campos do modal de edição com os dados do todo atualmente em edição
        const modalTitleInput = document.querySelector('.todo-title-edit');
        const modalDueDateInput = document.querySelector('.todo-due-date-edit');
        const modalDescriptionInput = document.querySelector('.todo-description-edit');
        modalTitleInput.value = newTodo.title;
        modalDueDateInput.value = newTodo.dueDate || '';
        modalDescriptionInput.value = newTodo.description || '';
    };
};
formTodo.addEventListener('submit', e => handleSubmit(e));
// Deletando lembretes
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
