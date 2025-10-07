import { Route, Routes } from "react-router";
import Background from "./assets/bg.jpg";
import { Header } from "./layouts";
import { ROUTES } from "./constants";

const App = () => {
  return (
    <main className="main">
      {/* Background */}
      <div
        style={{ backgroundImage: `url(${Background})` }}
        className="w-full h-full bg-cover bg-center absolute inset-0"
      />
      <Header />
      <Routes>
        {ROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={<route.element />} />
        ))}
      </Routes>
    </main>
  );
};
export default App;
