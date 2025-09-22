import React, { useState, useEffect } from 'react';
import {TiChevronLeft} from "react-icons/ti";
import {IoCloseCircleOutline} from "react-icons/io5";


export const Password = ({ onSubmit, onReturn,onExit, initialValues , patientname, patientemail}) =>{


    const RegExCase = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    const RegExEPlus = /^.{8,}$/;
    const RegExNS = /[0-9!@#$%^&*(),.?":{}|<>[\]_-]/;
    const test="HI"
    const isPasswordCase=()=>{
            return(formValues.Password===formValues.RePassword)&&RegExCase.test(formValues.Password)
        }
    const isPasswordEPlus=()=>{
        return(formValues.Password===formValues.RePassword)&&RegExEPlus.test(formValues.Password)
    }   
    const isPasswordNS=()=>{
        return(formValues.Password==formValues.RePassword)&&RegExNS.test(formValues.Password)
    }   
    const isPasswordNE=()=>{
    
        return(isPasswordEPlus() &&formValues.Password===formValues.RePassword&& !formValues.Password.toLowerCase().includes(patientname.toLowerCase()))&& !formValues.Password.toLowerCase().includes(patientemail.toLowerCase())
    }



    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('passwordFormData')) || {};
        setFormValues((prevValues) => ({
          ...prevValues,
            Password: storedData.Password || '',
            RePassword: storedData.RePassword || '',
            }));
    
       
      }, []);
    
      const [formValues, setFormValues] = useState({
        Password: '',
        RePassword: '',

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
        localStorage.setItem('passwordFormData', JSON.stringify(formValues));
        console.log(formValues);
        // Proceed with form submission
        onSubmit({ password: formValues });
      };

    
    return (
        <div className="flex flex-col w-full h-screen min-w-fit justify-center items-center bg-gray-100"  >
        <form className="relative w-full max-w-4xl  h-auto scale-y-105 bg-sky-950 rounded-lg " onSubmit={handleSubmit}>
           <p className="mt-1 -mb-6 text-white justify-center font-semibold text-[32px] flex items-center py-2"> New Account</p>
           <IoCloseCircleOutline className="absolute top-5 right-5 scale-150 text-white h-6 w-6" onClick={onExit}/>
            <div className=" mx-4 w-auto scale-y-90 bg-white rounded-lg translate-y-2 pb-4 items-center">
            <TiChevronLeft class="absolute top-1/2 left-20 transform translate-y-1/2 h-5 w-5 scale-150 text-gray-400"
            onClick={() => {
              // Save current form data to localStorage before returning
              localStorage.setItem('passwordFormData', JSON.stringify(formValues));
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
                <li className="flex items-center after:content-[''] text-blue ">
                    <span className="flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12  shrink-0">3</span>
                    <hr className='w-32 h-1 border-t-4 border-gray-200'/>
                    <div class="h-0 w-0 border-x-8 border-x-transparent border-b-[16px] border-b-gray-200 rotate-90"></div>
                </li>
                <li className="flex  items-center text-white">
                    <span className="flex items-center justify-center w-10 h-10 bg-teal-600 rounded-full lg:h-12 lg:w-12  shrink-0">4</span>
                </li>
            </ol>
            </div>
            {/*Form Field*/}
            <div className="mx-28 pt-6 grid gap-4 md:grid-cols-3">
            <div className=" text-sky-950 font-bold text-xl col-span-3  ">Password</div>
            <input  value={formValues.Password} onChange={handleChange}class="col-span-3 w-full bg-gray-100  rounded-lg text-lg focus:border-black-10 p-2 " type="password" placeholder="Password" Name="Password" required/>
            <input value={formValues.RePassword} onChange={handleChange} class="col-span-3 bg-gray-100  rounded-lg text-lg focus:border-black-10 p-2 " type="password" placeholder="Confirm Password" Name="RePassword" required/>
            <ul className='list-disc col-span-3 pl-6 text-sm'>
                <li className={`${isPasswordCase() ? 'text-teal-500' : 'text-red-500'}`}> Combination of lower & upper case letters</li>
                <li className= {`${isPasswordEPlus() ? 'text-teal-500' : 'text-red-500'}`} > At least 8 characters</li>
                <li className= {`${isPasswordNS() ? 'text-teal-500' : 'text-red-500'}`} > Containing a number or a symbol</li>
                <li className= {`${isPasswordNE() ? 'text-teal-500' : 'text-red-500'}`} > Cannot contain your name or email</li>

            </ul>
            <button className="block col-span-3 bg-gradient-to-r from-teal-400 to-teal-600 hover:bg-teal-700 rounded-lg text-lg focus:border-black-10 p-2 block text-white font-semibold" disabled={!isPasswordCase() || !isPasswordEPlus() || !isPasswordNS()|| !isPasswordNE()} type="submit">Create Account</button>            

            </div>
        
        </div>
        
        
    </form>   
    </div>
        
        
        
        
        
        


            
          
            

            
     
        
    )

}