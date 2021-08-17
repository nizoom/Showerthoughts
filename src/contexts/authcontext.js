import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";

const AuthContext = React.createContext();


//import { firestore } from "../../../firebase/firebase";

export function useAuth() {

    return useContext(AuthContext)
}


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    //const [loading, setLoading] = useState(true)

    function signup(email, password) {
        console.log('yo we signed up')

        return auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log(user)
                return user
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage)
            });

    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log(`setting user:  ${user}`)
            setCurrentUser(user)
        })

        return unsubscribe;
    }, [])


    const value = {
        currentUser,
        signup
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}