import firebase from "firebase";
// import { postUsername } from "../setuserdata/postuserdata";

const db = firebase.database()


export async function getUserInfo(neededAccountEmail, callback) {
    console.log("fired")
    //get username from db 
    //iterate through account email till there is a match with the newly logged in person
    //return that account to be displayed in the dashboard

    const usersRef = db.ref("users")

    await usersRef.on('value', (snapshot) => {
        const users = snapshot.val();
        const dataToArr = Object.entries(users)
        let index = 0;
        dataToArr.forEach(account => {
            const accountEmail = account[1].email
            if (accountEmail === neededAccountEmail) {
                index += dataToArr.indexOf(account)
            }

        })

        const accountFound = dataToArr[index]

        callback(accountFound)

        console.log(accountFound)
        //return accountFound




    })


}



    //return whole userobject and we can parse as needed



    // const userRef = database.ref('users/' + username);
    // userRef.on('value', function (snapshot) {
    //     const userInfo = snapshot.val()
    //     return userInfo.username
    //     //alert(userInfo.username)
    // })


       // for (let email in users.email) {
        //     if (email === neededAccountEmail) {
        //         console.log(users[email])
        //     }
        // }




        // const dataToArr = Object.entries(data)


        // for (let i = 0; i < dataToArr.length; i++) {
        //     const accountEmail = dataToArr[i][1].email
        //     if (accountEmail === email) {
        //         const account = dataToArr[i]
        //         console.log(account)
        //         return account;
        //     }
        // }