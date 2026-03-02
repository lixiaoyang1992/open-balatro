import { createBrowserRouter } from "react-router-dom";
import MainMenu from "./pages/MainMenu/MainMenu";
import BlindSelect from "./pages/BlindSelect/BlindSelect";
import Game from "./pages/Game/Game";
import Shop from "./pages/Shop/Shop";

export const router = createBrowserRouter([
  { path: "/", element: <MainMenu /> },
  { path: "/blind-select", element: <BlindSelect /> },
  { path: "/game", element: <Game /> },
  { path: "/shop", element: <Shop /> },
]);
