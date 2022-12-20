const cloneDeep = (x) => {
  return JSON.parse(JSON.stringify(x));
};

// Object.freeze를 통해 객체의 복사본을 가져와 동결시킴
const freeze = (x) => Object.freeze(cloneDeep(x));

const INITIAL_STATE = {
  todos: [],
  currentFilter: "All",
};

export default (initalState = INITIAL_STATE) => {
  const state = cloneDeep(initalState);
  let listeners = [];

  const addChangeListener = (listener) => {
    listeners.push(listener); // listeners 레지스트리에 추가
    listener(freeze(state)); // 불변 상태를 넣어줌
    // unsubscribe 작업
    return () => (listeners = listeners.filter((l) => l !== listener));
  };

  // listenrs 레지스트리에 있는 콜백 함수들을 실행
  const invokeListeners = () => {
    const data = freeze(state);
    listeners.forEach((l) => l(data)); //[?] addChangeListener 실행중 상태인가
  };

  const addItem = (text) => {
    if (!text) {
      return;
    }

    state.todos.push({
      text,
      completed: false,
    });

    invokeListeners();
  };

  const updateItem = (index, text) => {
    if (!text) {
      return;
    }

    if (index < 0) {
      return;
    }

    if (!state.todos[index]) {
      return;
    }

    state.todos[index].text = text;

    invokeListeners();
  };

  const deleteItem = (index) => {
    if (index < 0) {
      return;
    }

    if (!state.todos[index]) {
      return;
    }

    state.todos.splice(index, 1);

    invokeListeners();
  };

  const toggleItemCompleted = (index) => {
    if (index < 0) {
      return;
    }

    if (!state.todos[index]) {
      return;
    }

    state.todos[index].completed = !state.todos[index].completed;

    invokeListeners();
  };

  const completeAll = () => {
    state.todos.forEach((t) => {
      t.completed = true;
    });

    invokeListeners();
  };

  const clearCompleted = () => {
    state.todos = state.todos.filter((t) => !t.completed);
    invokeListeners();
  };

  const changeFilter = (filter) => {
    state.currentFilter = filter;
    invokeListeners();
  };

  return {
    addItem,
    updateItem,
    deleteItem,
    toggleItemCompleted,
    completeAll,
    clearCompleted,
    changeFilter,
    addChangeListener,
  };
};
