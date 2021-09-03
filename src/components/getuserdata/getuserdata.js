import firebase from "firebase";


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
                // console.log(`${accountEmail} and ${neededAccountEmail}`)
                index += dataToArr.indexOf(account)
            }

        })

        const accountFound = dataToArr[index]

        callback(accountFound)

        console.log(accountFound)

    })


}


