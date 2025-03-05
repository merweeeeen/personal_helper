import { db } from "../firebase/firebaseConfig";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export async function sendExpense(
  email: string,
  item: string,
  amount: number,
  category: string,
  description: string,
  date: Date | null,
  meal?: string,
) {
  try {
    const expenseRef = await addDoc(collection(db, "expense"), {
      item: item,
      amount: amount,
      category: category,
      description: description,
      meal: meal ? meal : "",
      time: date,
      is_active: true,
    });
    await updateDoc(doc(db, "users", email), {
      expenseHistory: arrayUnion(expenseRef.id),
    });
  } catch (err) {
    console.log(err);
  }
}

export async function signUp(email: string, password: string, name: string) {


  try {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { message: "Email Exists", status: "Failed" }
    }
    await setDoc(doc(db, "users", email), {
      email: email,
      password: password,
      name: name,
    });
    return { message: "Registered", status: "Success" }
  } catch (err) {
    console.log(err);
  }
}

export async function getUser(email: string, password: string) {
  try {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data()['password'] == password) {
        return { message: "Credential Match", status: "Success", data: docSnap.data() }
      } else {
        return { message: "Wrong Password", status: "Failed" }
      }
    } else {
      // docSnap.data() will be undefined in this case
      return { message: "User Does not Exists", status: "Failed" }
    }
  } catch (err) {
    console.log(err);
  }
}

