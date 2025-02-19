import { lazy } from "react";

const HomePageDisplay = lazy(() => import("./HomePage.tsx"));
export { HomePageDisplay as HomePage };
