import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import RootRouter from "./RootRouter";
import "./global.scss";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <RecoilRoot>
    <Suspense fallback={<>loading...</>}>
      <RouterProvider router={RootRouter} />
    </Suspense>
  </RecoilRoot>,
);
