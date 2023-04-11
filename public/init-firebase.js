import {createFirestoreData, deleteFirestoreData, readFirestoreData, updateFirestoreData} from "/crud.js";
import {filterFirestoreData} from "/filter.js";
import {googleSignInFunc, googleSignOutFunc} from "/googleAuth.js";
import {readFirebaseStorage} from "/storage.js";


//const analytics = getAnalytics(app);

document.querySelector("#google-sign-in")?.addEventListener("click", function () {
    googleSignInFunc();
});

document.querySelector("#google-sign-out")?.addEventListener("click", function () {
    googleSignOutFunc();
});


/*   sign in and sign up for normal if and password*/

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct")

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");

const returnBtn = document.getElementById("return-btn");

var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;


if (createacctbtn) {
    createacctbtn.addEventListener("click", function () {
        var isVerified = true;

        signupEmail = signupEmailIn.value;
        confirmSignupEmail = confirmSignupEmailIn.value;
        if (signupEmail != confirmSignupEmail) {
            window.alert("Email fields do not match. Try again.")
            isVerified = false;
        }

        signupPassword = signupPasswordIn.value;
        confirmSignUpPassword = confirmSignUpPasswordIn.value;
        if (signupPassword != confirmSignUpPassword) {
            window.alert("Password fields do not match. Try again.")
            isVerified = false;
        }

        if (signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
            window.alert("Please fill out all required fields.");
            isVerified = false;
        }

        if (isVerified) {
            createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // ...
                    window.alert("Success! Account created.");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage + errorCode);
                    window.alert("Please try again");
                });
        }
    });
}

if (submitButton) {
    submitButton.addEventListener("click", function() {
        email = emailInput.value;
        console.log(email);
        password = passwordInput.value;
        console.log(password);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("Success! Welcome back!");
                window.alert("Success! Welcome back!");
                window.location.assign("videopage.html");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage + errorCode);
                window.alert("Please try again");
            });
    });
}

if (signupButton) {
    signupButton.addEventListener("click", function () {
        main.style.display = "none";
        createacct.style.display = "block";
    });

}

if (returnBtn) {
    returnBtn.addEventListener("click", function () {
        main.style.display = "block";
        createacct.style.display = "none";
    });
}

readFirebaseStorage();

// 新增資料到 Firestore 中
//  createFirestoreData();

// 從 Firestorm 中讀取資料
// readFirestoreData();

// 更新 Firestore 的資料
//  updateFirestoreData();

// 在 Firestore 中刪除資料
//  deleteFirestoreData();

// 從 Firestorm 中讀取資料前做過濾條件
//  filterFirestoreData();
