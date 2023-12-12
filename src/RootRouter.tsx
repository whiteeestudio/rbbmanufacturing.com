import Landing from "pages/Landing";
import { createBrowserRouter } from "react-router-dom";

const RootRouter = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
]);

export default RootRouter;
