import todosView from "./view/todos.js";
import counterView from "./view/counter.js";
import filtersView from "./view/filters.js";
import appView from "./view/app.js";
import applyDiff from "./applyDiff.js";

import registry from "./registry.js";

import modelFactory from "./model/model.js";

registry.add("app", appView);
registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

const model = modelFactory();

const { addChangeListener, ...events } = model;

const render = (state) => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector("#root");

    const newMain = registry.renderRoot(main, state, events);

    applyDiff(document.body, main, newMain);
  });
};

// render 함수를 리스너로 사용
// addChangeListener를 통해 render는 처음 가입할 때 한 번과
// 내부 상태가 변경될 때 한 번 실행이 되게 됨 -> invokeListeners에 의해 변경된 상태 적용
addChangeListener(render); // render를 수동으로 사용하는게 아닌 옵저버블로 관리
