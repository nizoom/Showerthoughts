
export function loginValidation(errCode) {
    switch (errCode) {
        case "auth/user-not-found":
        case "auth/wrong-password":
            return "Password or email address is invalid. Please try again.";

        case "auth/invalid-email":
            return "Please make sure you entered a valid email address";

        default:
            return null
    }
}

export function passwordConfirmation(pw, confirmpw) {
    if (pw.length < 6 || confirmpw.length < 6) {
        return "too short"
    }
    if (pw !== confirmpw) {
        // "Passwords don't match"
        return false;
    } return true;
}