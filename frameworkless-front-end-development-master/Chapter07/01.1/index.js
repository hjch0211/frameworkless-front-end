import todosView from "./view/todos.js";
import counterView from "./view/counter.js";
import filtersView from "./view/filters.js";
import appView from "./view/app.js";
import applyDiff from "./applyDiff.js";

import registry from "./registry.js";

import stateFactory from "./model/state.js";

registry.add("app", appView);
registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

const loadState = () => {
  const serializedState = window.localStorage.getItem("state");

  if (!serializedState) {
    return;
  }

  return JSON.parse(serializedState);
};

const state = stateFactory(loadState());

const { addChangeListener, ...events } = state;

const render = (state) => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector("#root");

    const newMain = registry.renderRoot(main, state, events);

    applyDiff(document.body, main, newMain);
  });
};

addChangeListener(render);

// 상태를 로컬 스토리지에 저장하는 리스너
addChangeListener((state) => {
  Promise.resolve().then(() => {
    window.localStorage.setItem("state", JSON.stringify(state));
  });
});

// 로그를 기록하는 리스너
addChangeListener((state) => {
  console.log(`Current State (${new Date().getTime()})`, state);
});
