import { collection, doc, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"
import { onSnapshot } from "firebase/firestore"

export const useGetTransactions = () => {
  const [transactions, setTransactions] =  useState([])
  const {userID} = useGetUserInfo()
  const transactionCollectionRef = collection(db, "transactions")

 const getTransactions = async  ()=> {
     
    let unsubscribe

    try{

        const queryTransactions = query(transactionCollectionRef, where("userID", "==", userID), orderBy("createdAt"))
    unsubscribe = onSnapshot(queryTransactions, (snapshot)=> {
          let docs =[]
            snapshot.forEach(doc => {
                const data = doc.data()
                const id = doc.id

                docs.push({...data, id})
            });

            setTransactions(docs)
        })
    } catch(error){
        console.error(error)
    }

    return ()=> unsubscribe()
 }

 useEffect(()=>{
  getTransactions()
 }, [])

  return{transactions}
}