export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
export const validatePassword = (password) => {
    if (password.length < 6) {
        return { isValid: false, message: 'Password must be at least 6 characters long' };
    }
    return { isValid: true };
};
export const validateLoginForm = (username, password) => {
    const errors = {};
    if (!username.trim()) {
        errors.username = 'Username is required';
    }
    if (!password.trim()) {
        errors.password = 'Password is required';
    }
    else {
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            errors.password = passwordValidation.message;
        }
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
