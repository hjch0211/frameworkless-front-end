export default () => {
  const routes = []; // addRoutes로 이 배열에 값 저장
  let notFound = () => {}; // notFound면 실행시킬 함수
  const router = {};

  // 현재 프래그먼트와 일치하는 경로를 찾음
  const checkRoutes = () => {
    // 등록된 route들 안에 현재 fragment가 있는지 체크
    const currentRoute = routes.find((route) => route.fragment === window.location.hash);
    // 없으면 notFound 함수 실행
    if (!currentRoute) {
      notFound();
      return;
    }
    // component 함수를 실행 시킴
    currentRoute.component();
  };

  router.addRoute = (fragment, component) => {
    routes.push({ fragment, component });
    return router; // 이런 식으로도 함수 체이닝이 가능하네
  };

  router.setNotFound = (cb) => {
    notFound = cb;
    return router;
  };

  router.start = () => {
    // hashchange 현재 프래그먼트가 바뀔 때 이벤트
    window.addEventListener("hashchange", checkRoutes);
    if (!window.location.hash) window.location.hash = "#/";
    checkRoutes();
  };

  return router;
};
