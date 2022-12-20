import createRouter from "./router.js";
import createPages from "./pages.js";

const container = document.querySelector("main");

const pages = createPages(container);

const router = createRouter();

router
  .addRoute("#/", pages.home) // 새 라우터와 구성 요소를 정의하고 추가
  .addRoute("#/list", pages.list)
  .setNotFound(pages.notFound) // 없는 프래그먼트일 경우 반환할 요소를 넣어줌
  .start();
