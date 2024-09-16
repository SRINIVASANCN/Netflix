import { initializeApp } from "firebase/app";
import { 
     createUserWithEmailAndPassword,
     getAuth, 
     signInWithEmailAndPassword, 
     signOut} from "firebase/auth";
import { 
     addDoc,
     collection,
      getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyAbBgGmFsYxVeZ8s_2eJOSBQlXyN7NSq4I",
  authDomain: "netflix-clone-a74bd.firebaseapp.com",
  projectId: "netflix-clone-a74bd",
  storageBucket: "netflix-clone-a74bd.appspot.com",
  messagingSenderId: "325236612150",
  appId: "1:325236612150:web:8456ae07ebf6da72bdcc97"
};


const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
     try{
         const res =  await createUserWithEmailAndPassword(auth, email, password);
         const user = res.user;
         await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider: "local",
            email,
         });
     }catch(error){
            console.log(error);
            toast.error(error.code.split('/')[1].split('-').join(" "));
     }
}

const login = async(email, password)=>{
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};