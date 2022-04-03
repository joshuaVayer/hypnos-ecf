import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import routes from "./routeManifest";

const Routing = () => {
  const navigate = useNavigate();
  const [target, setTarget] = React.useState(null);

  React.useEffect(() => {
    if (target) {
      navigate(target);
      setTarget(null);
    }
  }, [target]);

  const props = {
    navigate: target => setTarget(target)
  };

  return (
    <Routes>
      {routes.map(({ key, path, element }) => (
        <Route key={key} path={path} element={element(props)} />
      ))}
    </Routes>
  );
};

export default Routing;
