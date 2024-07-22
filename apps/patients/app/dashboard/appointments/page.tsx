"use client"
import { useEffect,useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import axios from "axios"

interface patient{
  id: number, 
 name: string,
 email: string,
 password: string,
 appoint: appoint[]
}

interface appoint{
  id        :  string,
  Purpose   :  string,
  location  :  string,
  number    :  string,
  email     :  string,
  time      :  string,
  date      :  string,
  doctorId  :  number,      
  userId    :  number,
  Status    :  string
}


export default function Sess(){
  const [data,setData]=useState<patient | undefined>()
  let count=0;
   useEffect(()=>{
    axios.get("http://localhost:3000/api/book")
    .then((res)=>{
        setData(res.data.appointments[0])
        console.log(res.data.appointments[0])
        console.log(data)
    })

   },[])

   const date=new Date()
   return(
    <div className="w-full px-2" >
    <div className="flex justify-between items-center h-20 w-full" >
      <div className="flex justify-around items-center">
      <button className="bg-blue-300 text-blue-800 h-12 w-36 rounded-xl mx-4" onClick={()=>{window.history.back()}}>Back</button>
<h2 className="text-xl font-bold " >Session</h2>
</div>
<div className="flex">
  <div className="mr-2" >
  <p className=" text-sm">Today's date</p>

  <p className="text-lg font-semibold" style={{marginTop:"-8px"}}> {date.getDate()}-{date.getMonth()}-{date.getFullYear()} </p>
  </div>
<div className="h-12 w-12 bg-slate-100 rounded-lg flex justify-center items-center"><FaCalendarDays size={30}></FaCalendarDays></div> 
</div>
</div>
<p className="text-3xl font-semibold  my-2">My Bookings</p>



<div className="border rounded-lg h-10 w-full mt-2">

</div>
{data?.appoint?.map((e)=>{ if(e.Status==="Pending"){
  count=1
  return <Sessions key={e.id} id={e.id} purpose={e.Purpose} appointmentNum={e.id.toString()} PatientName={data.name} time={e.time} day={e.date} ></Sessions>}})}
  {count===0? <div className="h-72 w-full flex items-center justify-center"><p>None of your meetings are pending</p></div>: <p></p> }
    </div>
   )
}


 function Sessions({purpose,appointmentNum,PatientName,time,day,id}:{purpose:string,appointmentNum:string,PatientName:string,time:string,day:string,id:string}){
   
  const date=new Date()

    return(
       


      <div className="h-80  my-3 border border-slate-500 rounded-lg text-lg font-semibold text-slate-700">
        <div className="p-3">
        <p className="font-thin ">Booking Date:-  {date.getDate()}-{date.getMonth()}-{date.getFullYear()}</p>
        <p className="font-thin">Reference Number:- 00cc-124484</p>
        <p className="my-1 ">{purpose}</p>
        <p className="my-1">Appointment</p>
        
        <p className="text-blue-600 text-3xl my-3">{appointmentNum}</p>
        <div className="text-sm font-thin">
        <p>{PatientName}</p>
        <p>Date:- 2024-07-{day}</p>
        <p>Timing:-{time}:00 PM</p>
        </div>
        <button className="bg-blue-300 text-blue-700 rounded-lg h-10 w-96 my-4 text-center"   onClick={async()=>{
           const res= await axios.post("http://localhost:3000/api/book/cancel",{
            id,
           })
           console.log(res)
        }}>Cancel Booking</button>
        </div>
      </div>
            
    )
}