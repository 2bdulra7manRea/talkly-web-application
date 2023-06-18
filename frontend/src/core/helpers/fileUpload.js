import { firebaseStorage } from "../../configs/firebase";
import { v4 as uuidv4 } from 'uuid';
import "firebase/compat/storage";
export const uploadFiles = async (files) => {
const file = files[0];
const fileName =uuidv4();

return new Promise((res,rej)=>{

firebaseStorage.ref(`/files/${fileName}`).put(file).on("state_changed" ,()=>{
},(err)=>{
    rej(err)
},()=>{
    firebaseStorage
      .ref("files")
      .child(fileName)
      .getDownloadURL().then((url)=>{
        res(url)
      })
});
})
  }