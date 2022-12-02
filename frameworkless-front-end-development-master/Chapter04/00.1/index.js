import HelloWorld from "./components/HelloWorld.js";

// <hello-world> 태그에 HelloWorld 클래스에 연결하면 사용자 정의 태그로 사용 가능
window.customElements.define("hello-world", HelloWorld);
