import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export default function App() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#0d0018]">
      <div className="game-viewport">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
