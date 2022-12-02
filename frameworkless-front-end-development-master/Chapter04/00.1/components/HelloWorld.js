const DEFAULT_COLOR = "black";

export default class HelloWorld extends HTMLElement {
  // 이걸로 color에 들어간 값을 가져올 수 있음
  get color() {
    return this.getAttribute("color") || DEFAULT_COLOR;
  }

  set color(value) {
    this.setAttribute("color", value);
  }

  // 구성 요소가 DOM에 연결되면 호출됨
  connectedCallback() {
    window.requestAnimationFrame(() => {
      const div = document.createElement("div");
      div.textContent = "Hello World!";
      div.style.color = this.color;
      this.appendChild(div);
    });
  }
}
