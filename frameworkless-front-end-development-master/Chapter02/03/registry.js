const registry = {};

/**
 * 레지스트리에 등록을 하고 DOM요소 변경
 */
const renderWrapper = (component) => {
  return (targetElement, state) => {
    const element = component(targetElement, state);

    const childComponents = element.querySelectorAll("[data-component]");

    Array.from(childComponents).forEach((target) => {
      const name = target.dataset.component;

      const child = registry[name];
      if (!child) return;

      target.replaceWith(child(target, state));
    });

    return element;
  };
};

// 레지스트리 객체에 필드 추가
const add = (name, component) => (registry[name] = renderWrapper(component));

const renderRoot = (root, state) => {
  const cloneComponent = (root) => root.cloneNode(true);
  return renderWrapper(cloneComponent)(root, state);
};

export default { add, renderRoot };
