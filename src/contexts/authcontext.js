import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";


const AuthContext = React.createContext();


//import { firestore } from "../../../firebase/firebase";

export function useAuth() {

    return useContext(AuthContext)
}


export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        console.log('yo we signed up')

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
                console.log(errorMessage)
            });

    }

    function login(email, password) {
        auth.signInWithEmailAndPassword(email, password)
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
                console.log(errorMessage)
            });
    }

    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        // let unmounted = false;

        // if (!unmounted) {
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log(user)
            setCurrentUser(user)
            setLoading(false)
        })
        // }


        // return () => {
        //     unmounted = true;
        // }

        return unsubscribe
    }, [])



    const value = {
        currentUser,
        signup,
        login,
        logout
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
