//import "antd/dist/antd.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ItemsPage from "./Pages/ItemsPage";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPages from "./Pages/RegisterPages";
import BillPage from "./Pages/BillPage";
import CustomerPage from "./Pages/CustomerPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Homepage />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/items"
            element={
              <ProtectedRoutes>
                <ItemsPage />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <CartPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/bills"
            element={
              <ProtectedRoutes>
                <BillPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/customer"
            element={
              <ProtectedRoutes>
                <CustomerPage />
              </ProtectedRoutes>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPages />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

export function ProtectedRoutes({ children }) {
  if (localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
