import React, { useContext, useState, useEffect, useMemo } from "react";
import { auth } from "../firebase/firebase";
import { loginValidation } from "../components/Previewpage/login/loginfuncs/validatelogin";
import { passwordConfirmation } from "../components/Previewpage/login/loginfuncs/validatelogin";
import { postUsername } from "../components/postuserdata/postuserdata";

// import { getUserInfo } from "../components/getuserdata/getuserdata";


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
        if (cnfmed && username.length > 3) { //might want to add more validation rules
            postUsername(username, email, password)
        } else {
            console.log("ERROR")
            setError("Please enter a username") // this is not enough
            return
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
        console.log("attempting log in")
        setError(null)
        return auth.signInWithEmailAndPassword(email, password)
        // .then((userCredential) => {
        //     // Signed in
        //     var user = userCredential.user;
        //     //console.log(user)
        //     return user
        //     // ...
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     // var errorMessage = error.message;
        //     console.log(errorCode)
        //     //console.log(errorMessage)
        //     let errorMessage = loginValidation(errorCode)
        //     setError(errorMessage)
        //     return false
        // });
        //get username from db 
        //iterate through username.email till there is a match


    }

    function logout() {
        return auth.signOut();
    }



    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log(user)
            setCurrentUser(user)
            setLoading(false)
            //establishUser()



        })
        // call get user data here 
        console.log(randomStr)

        return unsubscribe
    }, []) // or userInfoHook
    // async function establishUser() {
    //     console.log("firing in auth")
    //     const userInfo = await getUserInfo(currentUser.email)
    //     console.log(userInfo)
    //     setUserInfoHook(userInfo)
    // }


    // const userRef = React.useRef(null)

    // function storeUserInfo(userInfoz) {

    //     console.log(userInfoz)
    //     console.log("storing user info")

    //     //setUserInfo(userInfoz)
    //     userRef.current = userInfoz;

    // }


    // const value = {
    //     currentUser,
    //     signup,
    //     login,
    //     logout,
    //     error,
    //     //storeUserInfo,
    //     userInfoHook
    // }


    // console.log(typeof value)
    // setRandomStr("This is a test string ")
    const [context, setContext] = useState(

        // contextMethods: [currentUser,
        //     signup,
        //     login,
        //     logout,
        //     error,
        //     randomStr,
        //     setRandomStr]
    )



    const providerValue = useMemo(() => ({
        context, setContext
    }), [context, setContext])

    const [randomStr, setRandomStr] = useState("Beginning");
    //console.log(randomStr)

    return (
        <AuthContext.Provider value={{ signup, login, error, setError, logout, currentUser }}>

            {!loading && children}
        </AuthContext.Provider>
    )
}
