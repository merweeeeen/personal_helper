import { db } from "../firebase/firebaseConfig";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";

export async function sendExpense(
  item: string,
  amount: number,
  category: string,
  description: string,
  meal?: string
) {
  console.log(db);
  try {
    const expenseRef = await addDoc(collection(db, "expense"), {
      item: item,
      amount: amount,
      category: category,
      description: description,
      meal: meal ? meal : "",
      time: new Date(),
      is_active: true,
    });
    console.log(expenseRef.id);
    await updateDoc(doc(db, 'users', 'DfSm0v4amB8QlKvCAZGk'), {
        expenseHistory: arrayUnion(expenseRef.id)
    });
  } catch (err) {
    console.log(err);
  }
}
