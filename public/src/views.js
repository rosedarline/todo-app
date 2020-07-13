import { getFilters } from "./filters";
import { getTodos, toggleTodo, removeTodo } from "./todos";

// Render application todos based on filters
const renderTodos = () => {
  const todosEl = document.querySelector("#todos");
  const filters = getFilters();
  const filteredTodos = getTodos().filter((todo) =>
    todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  todosEl.innerHTML = "";

  todosEl.appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      todosEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent = "There are no to-do to show";
    todosEl.appendChild(emptyMessage);
  }
};

const generateTodoDOM = (todo) => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const textEl = document.createElement("span");
  const todos = getTodos();
  const removeButton = document.createElement("button");

  // Setup the todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    renderTodos();
  });

  // Setup the todo text
  textEl.textContent = todo.text;
  containerEl.appendChild(textEl);

  // Setup container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  // Setup the todo button
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    renderTodos();
  });

  return todoEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = (incompletedTodos) => {
  const summary = document.createElement("h2");
  const plural = incompletedTodos.length === 1 ? "" : "s";
  summary.classList.add("list-title");
  summary.textContent = `You have ${incompletedTodos.length} todo${plural} left`;

  return summary;
};

export { generateTodoDOM, renderTodos, generateSummaryDOM };
