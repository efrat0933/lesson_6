// callback function
// שליחת פונקציה כפרמטר 
import bcrypt from 'bcrypt';

function funcWithCallback(str, callbackFunc) {
    const myStr = 'my ' + str;
    callbackFunc(myStr);
}


function printStr(str) {
    console.log(str);
}

export const print = function (req, res) {
    funcWithCallback('home', printStr);
    res.status(200).send();
};


// promises 

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (true)
            resolve("foo");
        else reject(new Error('rejected'))
    }, 300);
});

myPromise.then((val) => {
    console.log(val)
}).catch((err) => {
    console.log(err)
})


// שרשור שני פרומיסים אחד בתוך השני 
const getUserData = new Promise((resolve, reject) => {
	const userData =  {userId: 173, name: 'John', emailConfirmation: true, emailConfirmationDate: "17/04/2020"} // getUserDataFromApi(173);
	if(userData) resolve(userData);
	else reject(new Error('Error'));
});

const checkEmailConfirmation = user => {
	if(user.emailConfirmation) return Promise.resolve(user.emailConfirmationDate);
}

getUserData
.then(checkEmailConfirmation)
.then (res => {
    console.log(res);
})
.catch( err => {
	console.log(err);
});


// Promises.all 
// אופציה לשרשר פרומיסים ולקבל תשובה רק כשכולם חוזרים

const promise1 = new Promise((resolve, reject) => {

    setTimeout(() => {
        resolve('resolved')
    }, 100);
})


const promise2 = new Promise((resolve, reject) => {

    setTimeout(() => {
        resolve('resolved2')
    }, 100);
})


Promise.all([promise1, promise2]).then((res) => {
    console.log(res);
})


// await
// אינו  מחליף את פרומיס אלא משמש אותנו במקומות שאנחנו חייבים בכל מקרה להמתין לתוצאה 
// זה עוזר לנו ליצור קוד קריא וברור יותר
// פונקציה שמכילה await
// חייבת להיות מוגדרת כאסינכרונית בצורה כזו

export const comparePassword = async function (password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    // פה הוא יחכה עד שהתשובה תחזור
    return match;
  }