import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
export default function App() {
    return (_jsx(AuthProvider, { children: _jsx(Router, { children: _jsx(AppRoutes, {}) }) }));
}
