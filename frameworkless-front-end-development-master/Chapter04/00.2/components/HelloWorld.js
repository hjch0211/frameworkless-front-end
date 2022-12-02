const DEFAULT_COLOR = "black";

export default class HelloWorld extends HTMLElement {
  // observedAttributes getter가 return하는 배열 속 속성만
  // attributeChangedCallback가 트리거
  static get observedAttributes() {
    return ["color"];
  }

  get color() {
    return this.getAttribute("color") || DEFAULT_COLOR;
  }

  set color(value) {
    this.setAttribute("color", value);
  }

  /**
   * @param name 변경된 속성의 이름
   * @param oldValue 속성 이전 값
   * @param newValue 속성 이후 값
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.div) return;

    if (name === "color") this.div.style.color = newValue;
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      // this.div..?
      this.div = document.createElement("div");
      this.div.textContent = "Hello World!";
      this.div.style.color = this.color;
      this.appendChild(this.div);
    });
  }
}
