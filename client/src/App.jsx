import React from 'react'
import axios from 'axios';
import {useState, useEffect} from 'react';

function App() {
  const [bucketList, setBucketList]=useState([]);
  const loadBucketList=async ()=>{
    const response=await axios.get(
      `${import.meta.env.VITE_BASE_URL}/bucketlist`
    )
    setBucketList(response.data.data);
  }

  useEffect(()=>{
    loadBucketList();
  },[]);
  return (
    <div>
      {
        bucketList.map((listItem)=>{
          const {_id,name, discription,isCompleted}=listItem;
         return<div key={_id}>
          <h1><span>{isCompleted?"✅":"⏳" }</span>{name}</h1>
          <p>{discription}</p>
         </div>
        })
      }
    </div>
  )
}

export default App
