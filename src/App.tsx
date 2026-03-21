import { Routes, Route } from "react-router";
import { routes } from "@/data/routes";

import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Nav />
      <main className="overflow-x-hidden">
        <Routes>
          {routes.map(({ path, element: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </main>
    </>
  );
}

export default App;
