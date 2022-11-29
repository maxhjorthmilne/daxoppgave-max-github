import { initializeApp } from "firebase/app"
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, query, where,
    orderBy, serverTimestamp, getDoc,
    updateDoc, getDocs, getDocFromCache, update,

} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyAGsyK2g2leBATVW7XpoRUl3XKbrg5LJh8",
    authDomain: "daxp-28b4e.firebaseapp.com",
    projectId: "daxp-28b4e",
    storageBucket: "daxp-28b4e.appspot.com",
    messagingSenderId: "551815392072",
    appId: "1:551815392072:web:253e7f6a64ee5a7247617d"
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

//collection ref
const colRef = collection(db, "Login")

//queries 

const login = document.querySelector(".login");

//counter
const plusMinus = document.getElementById('plus-minus');

const counterID = 'drfXpK2UpLEgOVdSGLuy';

const counterDB = collection(db, 'counter');

const counterDocRef = doc(db, 'counter', counterID);

const counterElement = document.getElementById('counter');


login.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault()
        const navn = login.username.value
        const passord = login.password.value
        const q = query(colRef, where("username", "==", navn))

        onSnapshot(q, (snapshot) => {
            let login = []
            snapshot.docs.forEach((doc) => {
                login.push({ ...doc.data(), id: doc.id })
                console.log("doc", doc.data())
            })
            const _ = null;
            const name = login[0].username
            const pass = login[0].password
            
            if (pass === passord) {
                console.log("congrats")
                const remove = document.querySelector(".remove")
                remove.remove()
                const newForm = document.querySelector("body");
                const newBody = document.querySelector(".d-none")
                newBody.classList.remove("d-none");
            } else {
                const div = document.querySelector(".feil")
                div.innerText += `Passord er feil!`
            }
        })
    }
});



//counter


plusMinus.addEventListener('click', e => {
    const emitter = e.target.textContent;
    switch (emitter) {
        case '+':
            updateDoc(counterDocRef, { value: parseInt(counterElement.innerText) + 1 })
            break;
        case '-':
            if (counterElement.innerText > 0) {
                updateDoc(counterDocRef, { value: parseInt(counterElement.innerText) - 1 })
            }
            break;
        default:
            break;
    }
})

onSnapshot(counterDB, snapshot => {
    let counters = [];
    snapshot.docs.forEach(doc => {
        counters.push({ ...doc.data(), id: doc.id })
    })
    counterElement.innerText = counters[0].value
})