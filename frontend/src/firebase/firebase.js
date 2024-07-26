import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//  app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7vNe_4V7W9QT_nOkguZh7lfDo3f7ICQE",
  authDomain: "ums-mern-stack.firebaseapp.com",
  projectId: "ums-mern-stack",
  storageBucket: "ums-mern-stack.appspot.com",
  messagingSenderId: "637086493701",
  appId: "1:637086493701:web:a55e70756a6c7fc362006c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, `gs://ums-mern-stack.appspot.com`);

export const productUpload = async (image) => {
  try {
    const storageRef = ref(storage, `/PROFILEimages/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    // Wait for the upload to complete
    await uploadTask;

    // Get the download URL
    const url = await getDownloadURL(uploadTask.snapshot.ref);
    console.log(url);
    return url;
    
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return null;  // Return null if there's an error
  }
};
