

import React, { useState, useEffect } from 'react';
import {TiChevronLeft} from "react-icons/ti";
import {TiChevronRight} from "react-icons/ti";
import {IoCloseCircleOutline} from "react-icons/io5";

export const Address = ({ onSubmit, onReturn,onExit, initialValues }) => {
  // Load stored data from localStorage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('addressFormData')) || {};
    setFormValues((prevValues) => ({
      ...prevValues,
      AddressL1: storedData.AddressL1 || '',
      AddressL2: storedData.AddressL2 || '',
      AddressL3: storedData.AddressL3 || '',
      PostCode: storedData.PostCode || '',
      County: storedData.County || '',
    }));

    
  }, []); 

  const [formValues, setFormValues] = useState({
    AddressL1: '',
    AddressL2: '',
    AddressL3: '',
    PostCode: '',
    County: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save formValues to localStorage
    localStorage.setItem('addressFormData', JSON.stringify(formValues));
    console.log(formValues);
    // Proceed with form submission
    onSubmit({ address: formValues });
  };


    
    
return(
<div className="flex flex-col w-full h-screen min-w-fit justify-center items-center bg-gray-100"  >
        <form className="relative w-full max-w-4xl  h-auto scale-y-105 bg-sky-950 rounded-lg " onSubmit={handleSubmit}>
           <p className="mt-1 -mb-6 text-white justify-center font-semibold text-[32px] flex items-center py-2"> New Account</p>
           <IoCloseCircleOutline className="absolute top-5 right-5 scale-150 text-white h-6 w-6" onClick={onExit}/>
            <div className=" mx-4 w-auto scale-y-90 bg-white rounded-lg translate-y-2 pb-4 items-center">
            <TiChevronLeft class="absolute top-1/2 left-20 transform translate-y-1/2 h-5 w-5 scale-150 text-gray-400"
            onClick={() => {
              // Save current form data to localStorage before returning
              localStorage.setItem('addressFormData', JSON.stringify(formValues));
              onReturn();
            }}/>
            <TiChevronRight class="absolute top-1/2 right-20 transform translate-y-1/2 h-5 w-5 scale-150 text-gray-400" onClick={handleSubmit}/>
            
            {/*Progress Bar*/}
            <div className='mx-32 pt-4 align-top'>
                <ol class="flex">
                <li className="flex flex-1 items-center text-blue">
                    <span className="flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12  shrink-0">1</span>
                    <hr className='w-32 h-1 border-t-4 border-gray-200'/>
                    <div class="h-0 w-0 border-x-8 border-x-transparent border-b-[16px] border-b-gray-200 rotate-90"></div>
                </li>
                <li className="flex items-center after:content-[''] text-white  ">
                    <span className="flex items-center justify-center w-10 h-10 bg-teal-600 rounded-full lg:h-12 lg:w-12  shrink-0">2</span>
                    <hr className='w-32 h-1 border-t-4 border-gray-200'/>
                    <div class="h-0 w-0 border-x-8 border-x-transparent border-b-[16px] border-b-gray-200 rotate-90"></div>
                </li>
                <li className="flex items-center after:content-[''] text-blue ">
                    <span className="flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12  shrink-0">3</span>
                    <hr className='w-32 h-1 border-t-4 border-gray-200'/>
                    <div class="h-0 w-0 border-x-8 border-x-transparent border-b-[16px] border-b-gray-200 rotate-90"></div>
                </li>
                <li className="flex  items-center text-blue">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12  shrink-0">4</span>
                </li>
            </ol>
            </div>
             {/*Form Field*/}
            <div className="mx-28 pt-2 grid gap-4 md:grid-cols-5 ">
            <p className="blcok text-sky-950 font-bold text-xl col-span-5">Current Residence</p>
            <input  class="col-span-5 bg-gray-100  rounded-lg text-lg focus:border-black-10 p-2 block" type="text" placeholder="Address Line 1" Name="AddressL1" value={formValues.AddressL1} onChange={handleChange} required/>
            <input class="col-span-5 bg-gray-100  rounded-lg text-lg focus:border-black-10 p-2 block" type="text" placeholder="Address Line 2" Name="AddressL2" value={formValues.AddressL2} onChange={handleChange} />
            <input class="col-span-5 bg-gray-100  rounded-lg text-lg focus:border-black-10 p-2 block" type="text" placeholder="Address Line 3" Name="AddressL3" value={formValues.AddressL3} onChange={handleChange}/>
            <input  class="bg-gray-100  rounded-lg text-lg focus:border-black-10 p-2 col-span-2 " type="postcode" placeholder="Post Code" Name="PostCode" value={formValues.PostCode} onChange={handleChange} pattern='[A-Za-z]{1,2}[0-9]{1,2}(\s)?[0-9][A-Za-z]{2}' required/>
            <input  class="col-span-3 bg-gray-100  rounded-lg text-lg focus:border-black-10 p-2 block" type="text" placeholder="Country" Name="County" value={formValues.County} onChange={handleChange} pattern='[A-Za-z]{3,}' required/>

            

            <button className="block col-span-5 bg-gradient-to-r from-teal-400 to-teal-600 hover:bg-teal-700 rounded-lg text-lg focus:border-black-10 p-2 block text-white font-semibold" type="submit" >Next</button>            
        </div>
        </div>
        
        
        
    </form>
   
    </div>










)
}