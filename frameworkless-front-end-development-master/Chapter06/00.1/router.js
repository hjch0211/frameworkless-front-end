export default () => {
  const routes = [];
  let notFound = () => {};
  const router = {};

  const checkRoutes = () => {
    const currentRoute = routes.find((route) => route.fragment === window.location.hash);
    if (!currentRoute) {
      notFound();
      return;
    }
    currentRoute.component();
  };

  router.addRoute = (fragment, component) => {
    routes.push({ fragment, component });
    return router;
  };

  router.setNotFound = (cb) => {
    notFound = cb;
    return router;
  };

  // navigate 구현
  router.navigate = (fragment) => (window.location.hash = fragment);
  router.start = () => {
    window.addEventListener("hashchange", checkRoutes);
    if (!window.location.hash) window.location.hash = "#/";
    checkRoutes();
  };
  return router;
};
