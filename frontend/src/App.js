import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProtectedRoute } from "./components/protected-route/authProtectedRoute";
import { AuthPage } from "./pages/auth/auth";
import { Main } from "./pages/main/main";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            <AuthProtectedRoute auth={true}>
              <Main />
            </AuthProtectedRoute>
          }
        ></Route>

        <Route
          path="/auth/*"
          element={
            <AuthProtectedRoute auth={false}>
              <AuthPage />
            </AuthProtectedRoute>
          }
        ></Route>

        <Route
          path="*"
          element={<p>There is nothing here : 404 Not Found</p>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
