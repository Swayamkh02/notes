// src/AddUser.js
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

async function addUser() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "John Doe",
      email: "john@example.com",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
