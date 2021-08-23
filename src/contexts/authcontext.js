import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { loginValidation } from "../components/Previewpage/login/loginfuncs/validatelogin";
import { passwordConfirmation } from "../components/Previewpage/login/loginfuncs/validatelogin";
import { setUsername } from "../components/setuserdata/setuserdata";


const AuthContext = React.createContext();


//import { firestore } from "../../../firebase/firebase";

export function useAuth() {

    return useContext(AuthContext)
}


export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState();



    function signup(email, password, pwdCnfm, username) {

        console.log('yo we signed up')
        let cnfmed = passwordConfirmation(password, pwdCnfm)

        //if this case doesn't come up then delete the below if statement 
        if (typeof cnfmed === "string") {
            setError("Your password must be at least 6 characters")
        }
        //username validation 
        console.log("validating username")
        console.log(username)
        if (cnfmed && username !== "") { //might want to add more validation rules
            setUsername(username, email, password)
        } else {
            setError("Please enter a username")
        }

        if (cnfmed) {
            return auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    //console.log(user)
                    return user
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log("error message from failed acct creation")
                    console.log(errorMessage)
                    setError(errorMessage)
                });
        } if (!cnfmed) {
            setError("Passwords do not match")
        }


    }

    function login(email, password) {
        setError(null)
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                //console.log(user)
                return user
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                // var errorMessage = error.message;
                console.log(errorCode)
                //console.log(errorMessage)
                let errorMessage = loginValidation(errorCode)
                setError(errorMessage)
            });
    }

    function logout() {
        return auth.signOut();
    }

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log(user)
            setCurrentUser(user)
            setLoading(false)

        })
        return unsubscribe
    }, [])



    const value = {
        currentUser,
        signup,
        login,
        logout,
        error
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
