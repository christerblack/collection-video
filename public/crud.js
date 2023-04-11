import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getFirestore,
    setDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";


import {app} from "/firebaseConfig.js";

const firestoreDB = getFirestore(app);

// Create Data
 export async function createFirestoreData(target_text) {
    // const citiesRef = collection(firestoreDB, "users");

     const user = localStorage.getItem("googleUser");
     // document.querySelector("#googleUserName").textContent = JSON.parse(user).displayName ;
      const username = JSON.parse(user).displayName;

    const originText = document.getElementById("text_english");

    const targetword =  document.getElementById("collocationtargetword");
      console.log("original text:" + originText.textContent);



     let keys = Object.keys(localStorage);
     for(let targetText of keys) {
         var SaveWord = /*`${'targetText'}:*/ `${localStorage.getItem('targetText')}`;
         // console.log(`${targetText}: ${localStorage.getItem(targetText)}`);
         // console.log("abcdefg  " + SaveWord + window.localStorage.length);
     }

     const text_key= `${target_text}_${new Date().getTime()}`
     await setDoc(doc(firestoreDB, username, text_key), {
        name:  `${username}`,
        targetText: `${target_text}`,
        originText: `${originText.textContent}`,
        timestamp: new Date().getTime(),
        datetime: new Date(),

    });
    // await setDoc(doc(citiesRef, "LA"), {
    //     name: "Los Angeles",
    //     state: "CA",
    //     country: "USA",
    //     capital: false,
    //     population: 3900000,
    //     regions: ["west_coast", "socal"],
    //     timestamp: new Date().getTime(),
    //     datetime: new Date(),
    // });
    // await setDoc(doc(citiesRef, "DC"), {
    //     name: "Washington, D.C.",
    //     state: null,
    //     country: "USA",
    //     capital: true,
    //     population: 680000,
    //     regions: ["east_coast"],
    //     timestamp: new Date().getTime(),
    //     datetime: new Date(),
    // });
    // await setDoc(doc(citiesRef, "TOK"), {
    //     name: "Tokyo",
    //     state: null,
    //     country: "Japan",
    //     capital: true,
    //     population: 9000000,
    //     regions: ["kanto", "honshu"],
    //     timestamp: new Date().getTime(),
    //     datetime: new Date(),
    // });
    // await setDoc(doc(citiesRef, "BJ"), {
    //     name: "Beijing",
    //     state: null,
    //     country: "China",
    //     capital: true,
    //     population: 21500000,
    //     regions: ["jingjinji", "hebei"],
    //     timestamp: new Date().getTime(),
    //     datetime: new Date(),
    // });
}

// Read Data
export async function readFirestoreData() {
    const docRef = doc(firestoreDB, "cities", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

// Update Data
export async function updateFirestoreData() {
    const washingtonRef = doc(firestoreDB, "cities", "DC");
    await updateDoc(washingtonRef, {
        timestamp: new Date().getTime(),
        datetime: new Date(),
    });
}

// Delete Data
export async function deleteFirestoreData() {
    await deleteDoc(doc(firestoreDB, "cities", "DC"));
}

