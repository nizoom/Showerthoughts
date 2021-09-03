import React, { useContext, useState, useEffect, useMemo, useCallback } from "react";
import { auth } from "../firebase/firebase";
import { postUsername } from "../components/postuserdata/postuserdata";
import { getUserInfo } from "../components/getuserdata/getuserdata";
// import { getUserInfo } from "../components/getuserdata/getuserdata";


const AuthContext = React.createContext();


//import { firestore } from "../../../firebase/firebase";

export function useAuth() {

    return useContext(AuthContext)
}


export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    // const [userName, setUsername] = useState()
    const [accountData, setAccountData] = useState()





    function signup(email, password, username) {

        console.log('signing up')


        // console.log(username)
        if (username.length > 3) { //might want to add more validation rules
            postUsername(username, email, password)
        } else {
            console.log("invalid username")

            return "Username must be longer than 3 characters long"
        }
        return auth.createUserWithEmailAndPassword(email, password)



    }

    function login(email, password) {
        console.log("attempting log in")
        return auth.signInWithEmailAndPassword(email, password)

    }

    function logout() {
        return auth.signOut();
    }



    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log(user)
            setCurrentUser(user)
            setLoading(false);

            //always get user info after successful login
            if (user !== null) {
                (async function () {
                    await getUserInfo(user.email, callback)
                })();

                function callback(data) {
                    // console.log(data)
                    setAccountData(data)
                }
            }





        })
        // call get user data here 
        console.log(randomStr)

        return unsubscribe
    }, []) // or userInfoHook



    // const value = {
    //     currentUser,
    //     signup,
    //     login,
    //     logout,
    //     error,
    //     //storeUserInfo,
    //     userInfoHook
    // }



    const [context, setContext] = useState()



    const providerValue = useMemo(() => ({
        context, setContext
    }), [context, setContext])

    const [randomStr, setRandomStr] = useState("Beginning");
    // console.log(userName)

    return (
        <AuthContext.Provider value={{ signup, login, logout, currentUser, accountData }}>

            {!loading && children}
        </AuthContext.Provider>
    )
}
