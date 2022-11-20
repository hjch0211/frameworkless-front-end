import getTodos from "./getTodos.js";
import todosView from "./view/todos.js";
import counterView from "./view/counter.js";
import filtersView from "./view/filters.js";
import applyDiff from "./applyDiff.js";

import registry from "./registry.js";

registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

const state = {
  todos: getTodos(),
  currentFilter: "All",
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector(".todoapp");
    const newMain = registry.renderRoot(main, state);
    applyDiff(document.body, main, newMain); // 바로 replaceWith가 아닌 Diff 알고리즘을 적용
  });
};

// 감시 역할
window.setInterval(() => {
  state.todos = getTodos();
  render();
}, 1000);

render();
