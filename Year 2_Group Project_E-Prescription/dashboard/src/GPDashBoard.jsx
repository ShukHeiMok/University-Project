import {React ,useState} from 'react';
import './App.css';
import { Chart as ChartJS } from "chart.js/auto";//Line Chart purpose
import { Line } from 'react-chartjs-2';// Line Chart purpose
import MyCalendar from './cal';
import { SlArrowLeftCircle } from "react-icons/sl";
import { GoHome } from "react-icons/go";
import { IoDocumentText } from "react-icons/io5";
import { CiMedicalCross } from "react-icons/ci";
import { BsCapsulePill } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import Elogo from './image/elogo.png'
import { CiUser } from "react-icons/ci";





export const  GPDash = ({waiting, approved,gpwaiting, gpapproved, gp, med, lastd, thisd}) => {
    const[open,setOpen] = useState(true);
 
    return (
<>
      <div className='flex'>
      {/* Left Nav Bar*/}
      <div 
      className={`transition-all duration-100 ${open ? 'w-72' : 'w-20'} h-screen bg-sky-950 relative ${
        !open ? 'hidden sm:block' : '' // Hide on small screens
      }`}
      >
        <SlArrowLeftCircle className={`absolute cursor-pointer rounded-full -right-3 top-9 w-8 h-8 text-white bg-[#fb9576] ${!open ? 'rotate-180' : ''}`}
        onClick={() => setOpen(!open)}
        />
      <ul className="pt-20 pl-4 pr-4 text-sm text-bold">
      <li className={`text-white flex items-center gap-x-2 cursor-pointer p-2 hover:bg-light-white rounded-md ${open ? 'border-2 border-[#fb9576]' : ''}`}>
        <img src={Elogo} alt="Logo" className='size-8' />
        <span className={`${!open && "hidden"} origin-left duration-200 text-lg pl-4`}>Medical Background</span>
      </li>
      <li className="text-white flex items-center gap-x-2 cursor-pointer p-2 hover:bg-light-white rounded-md pt-10">
        <GoHome className="w-6 h-6" />
        <span className={`${!open && "hidden"} origin-left duration-200 text-lg pl-4`}>Dashboard</span>
      </li>
      <li className="text-white flex items-center gap-x-2 cursor-pointer p-2 hover:bg-light-white rounded-md">
        <IoDocumentText className="w-6 h-6" />
        <span className={`${!open && "hidden"} origin-left duration-200 text-lg pl-4`}>Prescription</span>
      </li>
      <li className="text-white flex items-center gap-x-2 cursor-pointer p-2 hover:bg-light-white rounded-md">
        <CiMedicalCross className="w-6 h-6" />
        <span className={`${!open && "hidden"} origin-left duration-200 text-lg pl-4`}>General Practice</span>
      </li>
      <li className="text-white flex items-center gap-x-2 cursor-pointer p-2 hover:bg-light-white rounded-md">
        <BsCapsulePill className="w-6 h-6" />
        <span className={`${!open && "hidden"} origin-left duration-200 text-lg pl-4`}>Pharmacy</span>
      </li>
      <li className="text-white flex items-center gap-x-2 cursor-pointer p-2 hover:bg-light-white rounded-md">
        <CiSettings className="w-6 h-6" />
        <span className={`${!open && "hidden"} origin-left duration-200 text-lg pl-4`}>Setting</span>
      </li>
    </ul>
    </div>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 w-full">
  {/* First Row: Full Width : Title*/}
  <div ><p class='mx-6 py-5 pl-5 text-3xl font-semibold'>Clinical Overview</p> 
    <hr class="lg:col-span-4  col-span-2 border-gray-300 border m-0"/> </div>

  {/* Second Row: 2 Columns on Small Screens, 4 Columns on Medium and Large Screens 4 Status card */}
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2  px-4">
  {/* First Column */}
  <div className="grid grid-cols-2 gap-2 rounded-lg border-2 relative">
    <p className="absolute top-[-25px] left-0  px-2 py-0 font-['Montaser_Arabic'] font-bold text-[#737373]">Prescription Requests</p>
    <div className="flex  bg-[url('./image/waiting.png')] bg-left-top bg-no-repeat p-2  bg-contain h-28 lg:h-28">
        <p class="absolute my-16 ml-12 font-['Montaser_Arabic'] font-bold text-2xl text-[#004b80]">{waiting}</p>
    </div>
    <div className="flex  bg-[url('./image/approved.png')] bg-left-top bg-no-repeat p-2  bg-contain h-28 lg:h-28 mt-0">
        <p class="absolute my-16 ml-12 font-['Montaser_Arabic'] font-bold text-2xl text-[#004b80]">{approved}</p>
    </div>
  </div>

  {/* Second Column ]*/}
  <div className="grid grid-cols-2 gap-4 rounded-lg border-2 relative">
    <p className="absolute top-[-25px] left-0  px-2 py-0 font-['Montaser_Arabic'] font-bold text-[#737373]">Manage Patients</p>
    <div className="flex bg-[url('./image/gpwaiting.png')] bg-left-top bg-no-repeat p-2  bg-contain h-28 lg:h-28 mt-0">
      <p class="absolute my-16 ml-12 font-['Montaser_Arabic'] font-bold text-2xl text-[#004b80]">{gpwaiting}</p>
    </div>
    <div className="flex bg-[url('./image/gpapproved.png')]  bg-left-top bg-no-repeat p-2  bg-contain h-28 lg:h-28 mt-0">
      <p class="absolute my-16 ml-12 font-['Montaser_Arabic'] font-bold text-2xl text-[#004b80]">{gpapproved}</p>
    </div>
</div>
</div>





  
  
  {/* Third Row: Full Width  Line cart and patient info*/}
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 px-4">
    <div className=" md:col-span-2 p-2 rounded-lg border-2 h-110">
    <Line
  data={{
    labels: lastd.map((l) => l.month), // x Axis
    datasets:[
      {
        label:"Last Year", // Line label
        data: lastd.map((l)=>l.order), // Data at each point
        borderColor: '#fb9576', // Line color
        pointBackgroundColor: '#fb9576', // Center color of the point
        pointBorderColor: '#fff', // Border color of the point
        pointHoverBackgroundColor: '#fff', // Center color of the point on hover
      },
      {
        label:"This Year", // Line label
        data: thisd.map((t)=>t.order), // Data at each point
        borderColor: '#e6b4a6', // Line color (a bit brighter)
        pointBackgroundColor: '#e6b4a6', // Center color of the point
        pointBorderColor: '#fff', // Border color of the point
        pointHoverBackgroundColor: '#fff', // Center color of the point on hover
      }
    ]
  }}
  className='scale-x-120 scale-y-50 h-auto'
/>

</div>
    <div className=" p-2 rounded-lg border-2">{gp.map((gp) => (
    <>
      <p className="absolute font-['Montaser_Arabic'] font-semibold text-[14pt] text-[#104eca]">Hi {gp.FirstN}</p>
      <p className="absolute font-['Montaser_Arabic'] pt-6 font-semibold text-[10pt] text-[#000000]">Here is a summary of your medical information</p>
      <hr className='my-12'/>
      <div className='grid grid-cols-3  '>
        <CiUser className=' flex ml-4  row-span-3 size-16 border-4 rounded-full text-[#fb9576] border-[#fb9576] items-center'/>
        <p className='col-span-2 font-["Montaser_Arabic"] font-semibold text-[10pt] text-[#000000]'>{gp.FirstN} {gp.SurN} </p>
        <p className='col-span-2 font-["Montaser_Arabic"] font-semibold text-[10pt] text-[#737373]'>{gp.RegGP} | {gp.GPNum}</p>
      </div>
    </>
  ))}</div>
  </div>

  {/* Fourth Row: Two Elements with One Col-span-2 on Medium and Larger Screens: Medical Table and video */}
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 px-4">
    <div className=" p-2 rounded-lg border-2 h-auto md:col-span-2"><div className='overflow-x-auto overflow-y-auto px-4'>
    <table className='min-w-full leading-normal'>
      <thead>
        <tr>
          <th className='px-5 py-3 border-b-2 border-gray-200  text-left text-[12.5pt] font-bold  bold text-[#000000] font-["Montaser_Arabic"] tracking-wider'>
            Patients
          </th>
          <th className='px-5 py-3 border-b-2 border-gray-200  text-left text-[10pt] font-bold text-[#1f56b7]  font-["Montaser_Arabic"] tracking-wider'>
            Prescription
          </th>
          <th className='px-5 py-3 border-b-2 border-gray-200 text-center text-[10pt] font-bold text-[#1f56b7]  font-["Montaser_Arabic"] tracking-wider'>
            Status
          </th>
          <th className='px-5 py-3 border-b-2 border-gray-200  text-center text-[10pt] font-bold text-[#1f56b7]  font-["Montaser_Arabic"] tracking-wider'>
            Refill
          </th>
        </tr>
      </thead>
      <tbody>
        {med.map((m, index) => (
          <tr key={index}>
            <td className='px-5 py-5  bg-white '>
              <p className='text-[#747474] font-["Montaser_Arabic"] text-[10pt]  text-left whitespace-no-wrap'><span className='mr-2'>•</span>{m.PName} </p>
            </td>
            <td className='px-5 py-5  bg-white '>
              <p className='text-[#000000] font-["Montaser_Arabic"] text-[10pt]  text-left whitespace-no-wrap'>{m.med}<span className="text-[#737373]"> ({m.medinfo})</span></p>
            </td>
            <td className='px-5 py-5  bg-white '>
              <p className='text-[#000000] font-["Montaser_Arabic"] text-[10pt] text-center whitespace-no-wrap'>{m.Status}</p>
            </td>
            <td className='px-5 py-5  bg-white '>
              <p className='text-[#737373] font-["Montaser_Arabic"] text-[10pt] text-center whitespace-no-wrap'>{m.Refill}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div></div>{/* Calendar not fully functional */}
    <div className=" p-2 rounded-lg border-2 h-auto flex bg-[url('./image/gpvideo.png')]  bg-left-top bg-no-repeat p-2  bg-contain"></div>
  </div>
</div>

  </div>     
        
        
  
        
        

        

       </>

        
        

      )
  
  }

