"use client"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FaCalendarDays } from "react-icons/fa6";
import { PiCaretUpDownFill } from "react-icons/pi";
import { useEffect,useState } from "react";
import storage from "@/lib/firebaseconfig";
import axios from "axios"

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
    Status    :  string, 
    prescription : string,
    patientReport: string, 
    meetlink     : string,   
    patient      : patient
  }
  interface patient{
    id: number, 
   name: string,
   email: string,
   password: string,
  }

export default function Sessions(){
    const [data,setData]=useState<appoint[]>()
    const date=new Date()
 
    useEffect(()=>{
         axios.get("http://localhost:3001/api/getPatient")
         .then(res=>{
            console.log(res.data)
            setData(res.data.appointments)
         })
  },[])

    return(
        <div className="w-full">
              <div className="flex justify-between items-center h-20 " >
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
         <p className="text-3xl font-semibold mx-3 my-2">My Bookings</p>
        


      <div className="border rounded-lg h-10 mx-3 mt-2">
          
      </div>

      <div>
    <div className="border-2 mb-2 bg-blue-200 mx-3 rounded-lg mt-5 h-10 flex *:flex *:items-center *:justify-between *:border-r *:w-1/6 *:px-3 *:h-full">
         <div >Name of Patient <PiCaretUpDownFill/></div>
         <div >prescription <PiCaretUpDownFill/></div>
         <div >Report <PiCaretUpDownFill/></div>
         <div >meet Link <PiCaretUpDownFill/></div>
         <div >Meeting Time <PiCaretUpDownFill/></div>
         <div >Status <PiCaretUpDownFill/></div>
         </div>
         {data?.map((e)=><Card key={e.id} id={Number(e.id)} patient={e.patient.name} time={e.time} status={e.Status} report={e.patientReport}/>)}
    </div>
            </div>
    )
}

function Card({patient,time,status,id,report}:{patient:string,time:string,status:string,id:number,report:string}){
  const [color,setColor]=useState("yellow")
  const [image, setImage]=useState<File>()
  const [download,setDownload]=useState<string | null>()
  const [meetlink, setMeettlink]=useState<string | null>()
  useEffect(()=>{
      if(status==="Success"){
        setColor("indigo")
      }else if(status="Failure"){
        setColor("gray")
      }
  },[])

  const imageHandler=(files:any)=>{
    if(files && files[0].size<1000000){
       setImage(files[0])    
    }else{
       console.log("too long to handle")
    }
   }

   const imageUploader=()=>{
    if(image){
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, 'prescriptions/' + image?.name);
      const uploadTask = uploadBytesResumable(storageRef, image);
      
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {

          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
      
            // ...
      
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDownload(downloadURL)
            console.log('File available at', downloadURL);
          });
        }
      );
      
      
      }else{
          console.log("file not found")
      }
   }
   const str="w-max px-3 rounded-full h-6 bg-gray-200 mx-2"
    return(
        <div className="h-10 mx-3 border  flex items-center *:flex *:items-center *:justify-center *:border-r-2 *:h-full flex justify-between *:w-1/6 ">
          <div className="w-max px-4">{patient}</div>
        <div className="flex justify-around items-center"> 
        <label className={`w-max px-3 rounded-full h-6 bg-${color}-200 mx-2 `} >📝Choose
        <input id="upload" type="file" className="hidden" onChange={(e)=>imageHandler(e.target.files)} disabled={ status==="Failure" || status==="Pending"} />
        </label>
           <button className={`w-max px-3 rounded-full h-6 bg-${color}-300`} disabled={ status==="Failure" || status==="Pending"}  onClick={async()=>{
            imageUploader()
            const res= await axios.post("http://localhost:3001/api/patients/prescription",{
                 prescription: download,
                 id
              })
              console.log(res)
           }}>send</button></div>
        <div>  <a className={str} href={report}><button disabled={ status==="Failure" || status==="Pending"} >view</button></a></div>
           <div className="w-max px-3"><input className="w-20 rounded-l-full outline-none border p-2 h-6" placeholder="link" onChange={(e)=>{setMeettlink(e.target.value)}} disabled={ status==="Failure" || status==="Pending"}></input>< button className={`w-16 bg-${color}-200 rounded-r-full`} disabled={ status==="Failure" || status==="Pending"} onClick={async()=>{
            const res= await axios.post("http://localhost:3001/api/patients/meetLink",{
                 meetlink,
                 id
              })
              console.log(res)
           }}>send 👩🏻‍⚕️</button></div>
           <div className="w-max px-3">{time}:00 PM</div>
        <div>
          
           <button className={`w-max px-3 rounded-full h-6 bg-${color}-300 text-${color}-800 `}>{status}</button>
                                                     
         </div>
        </div>
    )
}