import { jsx as _jsx } from "react/jsx-runtime";
import AuthLayout from "../layouts/AuthLayout";
import LoginForm from "../components/common/loginForm";
export default function LoginPage() {
    return (_jsx(AuthLayout, { children: _jsx(LoginForm, {}) }));
}
