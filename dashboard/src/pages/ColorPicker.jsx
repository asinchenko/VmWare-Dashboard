import React from 'react'
import avatar from '../data/defaultProfile.png'
import {useStateContext} from '../contexts/ContextProvider';
import IMGDataService from '../services/imgs'
import axios from 'axios'


const url = 'http://localhost:4000/api/img/pic'

const ColorPicker = () => {

  const {postImage, setPostImage} = useStateContext();

  const createPost = async(newImage) => {
    try {
      await axios.post(url, {myFile:newImage.myFile, description:"HP"})
    }catch(e){
      console.log(e)
    }
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
    console.log("Uploaded")
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({...postImage, myFile: base64})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-upload" >
          <img src={postImage.myFile || avatar} alt="" className="inline-block rounded-full cursor-pointer"/>
        </label>
        <input className="hidden"
          type="file"
          lable="Image"
          name="myFile"
          id="file-upload"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => handleFileUpload(e)}
          />
          <h3>Some Text</h3>
        <span>Designer</span>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = () => {
      reject(fileReader.error)
    };
  })
}

export default ColorPicker