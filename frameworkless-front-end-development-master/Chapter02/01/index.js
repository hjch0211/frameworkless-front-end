import getTodos from "./getTodos.js";
import view from "./view.js";

const state = {
  todos: getTodos(),
  currentFilter: "All",
};

const main = document.querySelector(".todoapp");

// 렌더링 엔진 기반 -> 비동기적으로 사용가능한 것같음
window.requestAnimationFrame(() => {
  const newMain = view(main, state);
  main.replaceWith(newMain);
});
