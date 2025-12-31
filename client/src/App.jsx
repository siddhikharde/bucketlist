import React from 'react'
import axios from 'axios';
import {useState, useEffect} from 'react';

function App() {
  const [bucketList, setBucketList]=useState([]);
  const [newListItem , setNewListItem]=useState({
    name:"",
    description:"",
    priority:0
  })
  const loadBucketList=async ()=>{
    const response=await axios.get(
      `${import.meta.env.VITE_BASE_URL}/bucketlist`
    )
    setBucketList(response.data.data);
    console.log(response.data.data)
  }
   
  const markAsCompleted=async(id)=>{
    await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/bucketlist/${id}/complete`
    )
    loadBucketList();

  }
  const addNewItem=async ()=>{
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/bucketlist`,newListItem
    )
    loadBucketList();
    setNewListItem({
      name:"",
      description:"",
      priority:0
    })
  }
  useEffect(()=>{
    loadBucketList();
  },[]);
  return (
    
      <div className='flex flex-col w-full h-[100vh] items-center p-5  gap-2.5 bg-[#FEEAC9]  '>
      <h1 className='text-3xl font-bold color-'>Bucket List</h1>
      <div className='flex flex-col py-[20px]  gap-5 h-[450px] w-full items-center justify-center scroll-auto overflow-y-scroll'>
        {
        bucketList.map((listItem)=>{
          const {_id,name, description,isCompleted}=listItem;

         return<div key={_id}
         className='w-[80%] border rounded-[10px] p-3 flex flex-col gap-1 items-start justify-center text-[18px] '>
          <h1><span>{isCompleted?"✅":"⏳" }</span>{name}</h1>
            <p className='text-[13px]'>{description}</p>
          {
            isCompleted?null:
            <button onClick={()=>{
                markAsCompleted(_id)
            }} className='cursor-pointer text-[15px]  p-1 '>Mark as Completed</button>
          }
         </div>
        })
      }
      </div>
      <div>
        <input type='text' value={newListItem.name} placeholder='Enter Name' onChange={(e)=>{
          setNewListItem({...newListItem, name:e.target.value})
        }}/>
        <input type='text' value={newListItem.description} placeholder='Enter discription' onChange={(e)=>{
          setNewListItem({...newListItem, description:e.target.value})
        }}/>
        <input type='number' value={newListItem.description} placeholder='Enter priority' onChange={(e)=>{
          setNewListItem({...newListItem, priority:e.target.value})
        }}/>
        <button onClick={()=>{
          addNewItem();
        }}
        className='cursor-pointer'>Submit</button>
      </div>
    </div>
   
  )
}

export default App
