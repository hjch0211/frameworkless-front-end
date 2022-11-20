import getTodos from "./getTodos.js";
import todosView from "./view/todos.js";
import counterView from "./view/counter.js";
import filtersView from "./view/filters.js";

import registry from "./registry.js";

// 1. registry 등록
registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

const state = {
  todos: getTodos(),
  currentFilter: "All",
};

window.requestAnimationFrame(() => {
  const main = document.querySelector(".todoapp");
  // 2. renderRoot을 실행하여 root에 렌더링
  const newMain = registry.renderRoot(main, state);
  main.replaceWith(newMain);
});
