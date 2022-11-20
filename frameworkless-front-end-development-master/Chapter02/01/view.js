const getTodoElement = (todo) => {
  const { text, completed } = todo;

  return `
  <li ${completed ? 'class="completed"' : ""}>
    <div class="view">
      <input 
        ${completed ? "checked" : ""}
        class="toggle" 
        type="checkbox">
      <label>${text}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${text}">
  </li>`;
};

const getTodoCount = (todos) => {
  const notCompleted = todos.filter((todo) => !todo.completed);

  const { length } = notCompleted;
  if (length === 1) return "1 Item left";

  return `${length} Items left`;
};

export default (targetElement, state) => {
  const { currentFilter, todos } = state; // 0. 변경할 데이터를 받음
  // 1. targetElement를 복제. element는 가상 DOM의 역할
  const element = targetElement.cloneNode(true);

  const list = element.querySelector(".todo-list");
  const counter = element.querySelector(".todo-count");
  const filters = element.querySelector(".filters");

  // 2. 가상 DOM을 조작 후, 실제 DOM에 추가해줌
  list.innerHTML = todos.map((todo) => getTodoElement(todo)).join("");
  counter.textContent = getTodoCount(todos);

  Array.from(filters.querySelectorAll("li a")).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add("selected");
    } else {
      a.classList.remove("selected");
    }
  });

  return element;
};
