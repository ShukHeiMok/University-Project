import React, { useState, useEffect } from 'react';
import {TiChevronLeft} from "react-icons/ti";
import {TiChevronRight} from "react-icons/ti";
import {IoCloseCircleOutline} from "react-icons/io5";

export const GPSelect = ({ onSubmit, onReturn,onExit, initialValues, storedg }) =>{
    
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('gpFormData')) || {};
        setFormValues((prevValues) => ({
          ...prevValues,
          GP: storedData.GP || 'null',

        }));
    
        
      }, []); 
    
      const [formValues, setFormValues] = useState({
        GP: 'null',
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
        localStorage.setItem('gpFormData', JSON.stringify(formValues));
        console.log(formValues);
        // Proceed with form submission
        onSubmit({ gp: formValues });
      };

      const handleSkip = (e) => {
        e.preventDefault();
    
        // Save formValues to localStorage
        localStorage.setItem('gpFormData', JSON.stringify("null"));
        console.log(formValues);
        // Proceed with form submission
        onSubmit({ gp: "null"});
      };
    
    return (
        <div className="flex flex-col w-full h-screen min-w-fit justify-center items-center bg-gray-100"  >
        <form className="relative w-full max-w-4xl  h-auto scale-y-105 bg-sky-950 rounded-lg " onSubmit={handleSubmit}>
           <p className="mt-1 -mb-6 text-white justify-center font-semibold text-[32px] flex items-center py-2"> New Account</p>
           <IoCloseCircleOutline className="absolute top-5 right-5 scale-150 text-white h-6 w-6" onClick={onExit}/>
            <div className=" mx-4 w-auto scale-y-90 bg-white rounded-lg translate-y-2 pb-4 items-center">
            <TiChevronRight class="absolute top-1/2 right-20 transform translate-y-1/2 h-5 w-5 scale-150 text-gray-400" onClick={handleSubmit}/>
            <TiChevronLeft class="absolute top-1/2 left-20 transform translate-y-1/2 h-5 w-5 scale-150 text-gray-400"
            onClick={() => {
              // Save current form data to localStorage before returning
              localStorage.setItem('gpFormData', JSON.stringify(formValues));
              onReturn();
            }}/>            
            {/*Progress Bar*/}
            
            <div className='mx-32 pt-4 align-top'>
                <ol class="flex">
                <li className="flex flex-1 items-center text-blue">
                    <span className="flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12  shrink-0">1</span>
                    <hr className='w-32 h-1 border-t-4 border-gray-200'/>
                    <div class="h-0 w-0 border-x-8 border-x-transparent border-b-[16px] border-b-gray-200 rotate-90"></div>
                </li>
                <li className="flex items-center after:content-[''] text-blue  ">
                    <span className="flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12  shrink-0">2</span>
                    <hr className='w-32 h-1 border-t-4 border-gray-200'/>
                    <div class="h-0 w-0 border-x-8 border-x-transparent border-b-[16px] border-b-gray-200 rotate-90"></div>
                </li>
                <li className="flex items-center after:content-[''] text-white ">
                    <span className="flex items-center justify-center w-10 h-10 bg-teal-600 rounded-full lg:h-12 lg:w-12  shrink-0">3</span>
                    <hr className='w-32 h-1 border-t-4 border-gray-200'/>
                    <div class="h-0 w-0 border-x-8 border-x-transparent border-b-[16px] border-b-gray-200 rotate-90"></div>
                </li>
                <li className="flex  items-center text-blue">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12  shrink-0">4</span>
                </li>
            </ol>
            </div>
             {/*Form Field*/}
            <div className="mx-28 pt-4 grid gap-5 md:grid-col-3 ">
            <p className="text-sky-950 font-bold text-xl col-span-3">GP Registration</p>
            <p className="-mt-4 pb-2 text-gray-500 font-bold text-xs col-span-3">Remember you can always change/ update this later on.</p>

        
            <select className="col-span-3 blcok w-full bg-gray-100  rounded-lg text-lg focus:border-black-10 p-2" value={formValues.GP} onChange={handleChange}  Name="GP"  required>
              <option value="null">---Select your GP---</option>    
                {storedg.map(storedg =>{
                   return  <option key={storedg.id} value={(storedg.id).toString()} >{storedg.content}</option>
                })}     
            </select>         
            

            <button className="block col-span-2 bg-gradient-to-r from-teal-400 to-teal-600 hover:bg-teal-700 rounded-lg text-lg focus:border-black-10 p-2 block text-white font-semibold" type="submit">Next</button>
            <button className="block  bg-sky-600 hover:bg-sky-700 rounded-lg text-lg focus:border-black-10 p-2 block text-white font-semibold" onClick={handleSkip}>Skip</button>            
        </div>
        </div>
        
        
        
    </form>
   </div>
    




        
        
        
                
                
              
        
        
    )

}