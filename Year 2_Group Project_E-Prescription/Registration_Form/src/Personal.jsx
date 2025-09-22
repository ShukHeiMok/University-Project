import React, { useState, useEffect } from 'react';
import {TiChevronRight} from "react-icons/ti";
import {IoCloseCircleOutline} from "react-icons/io5";
import {PhoneInput} from "react-international-phone"
import 'react-international-phone/style.css';

export const Personalform = ({ onSubmit,onExit, initialValues }) => {
  // Load stored data from localStorage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('personalFormData')) || {};
    setFormValues((prevValues) => ({
      ...prevValues,
      Title: storedData.Title || 'default1',
      Name: storedData.Name || '',
      Surname: storedData.Surname || '',
      Email: storedData.Email || '',
      DoB: storedData.DoB || '',
      Sex: storedData.Sex || 'default2',
      CCode: storedData.CCode || '+44',
      Number: storedData.Number || '',
    }));

    
  }, []); 

  const [formValues, setFormValues] = useState({
    Title: 'default1',
    Name: '',
    Surname: '',
    Email: '',
    DoB: '',
    Sex: 'default2',
    CCode: '+44',
    Number: '',
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

    // if select fields have default values stop submit
    if (formValues.Title === 'default1' || formValues.Sex === 'default2') {
      console.error('Please select valid values for both select fields');
      return;
    }

    // Save formValues to localStorage
    localStorage.setItem('personalFormData', JSON.stringify(formValues));
    console.log(formValues);
    // Proceed with form submission
    onSubmit({ personal: formValues });
  };
    return (
      <div className="flex flex-col w-full h-screen min-w-fit justify-center items-center bg-gray-100"  >
      <form className="relative w-full max-w-4xl  h-auto scale-y-105 bg-sky-950 rounded-lg "onSubmit={handleSubmit} >
         <p className="mt-1 -mb-6 text-white justify-center font-semibold text-[32px] flex items-center py-2"> New Account</p>
          <IoCloseCircleOutline className="absolute top-5 right-5 scale-150 text-white h-6 w-6" onClick={onExit}/>
          <div className=" mx-4 w-auto scale-y-90 bg-white rounded-lg translate-y-2 pb-4 items-center">
          <TiChevronRight class="absolute top-1/2 right-20 transform translate-y-1/2 h-5 w-5 scale-150 text-gray-400" onClick={handleSubmit}/>
          
          {/*Progress Bar*/}
          <div className='mx-32 pt-4 align-top'>
              <ol class="flex">
              <li className="flex flex-1 items-center text-white">
                  <span className="flex items-center justify-center w-10 h-10 bg-teal-600 rounded-full lg:h-12 lg:w-12  shrink-0">1</span>
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
              <li className="flex  items-center text-blue">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12  shrink-0">4</span>
              </li>
          </ol>
          </div>
           {/*Form Field*/}
          <div className="mx-28 pt-2 grid gap-4 md:grid-cols-2">
          <p className=" text-sky-950 font-bold text-xl col-span-5">Personal Details</p>
          <div>
          <select className=" blcok w-full bg-gray-100  rounded-lg text-lg focus:border-black-10 p-2" Name="Title" value={formValues.Title} onChange={handleChange}  required>
              <option value="default1" disabled>Title</option>
              <option value="Mr">Mr.</option>
              <option value="Mrs">Mrs.</option>
              <option value="Ms">Ms.</option>
              <option value="Miss">Miss.</option>           
          </select>
          </div>
          <input  className="col-span-2 bg-gray-100  rounded-lg text-lg focus:border-black-10 p-2 block" type="text" placeholder="Name" Name="Name" value={formValues.Name} onChange={handleChange} required/>
          <input  className="col-span-2 bg-gray-100  rounded-lg text-lg focus:border-black-10 p-2 block" type="text" placeholder="Surname" Name="Surname" value={formValues.Surname} onChange={handleChange} required/>
          <input  className="col-span-5 bg-gray-100  rounded-lg text-lg focus:border-black-10 p-2 block" type="Email" placeholder="Email" Name="Email" value={formValues.Email} onChange={handleChange} required/>
          <input  className="col-span-3 bg-gray-100   rounded-lg text-lg focus:border-black-10 p-2 block" type="date" placeholder="Date of Birth" Name="DoB" value={formValues.DoB}  onChange={handleChange} required/>
          
          
          <select  className="col-span-2 bg-gray-100  rounded-lg text-lg focus:border-black-10 p-2 block" Name="Sex" defaultValue="default" value={formValues.Sex} onChange={handleChange} required>
                  <option value="default2" disabled>Biological Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
          </select>
          <select className="bg-gray-100  rounded-lg text-lg focus:border-black-10 p-2 block" Name="CCode" defaultValue="+44" value={formValues.CCode} onChange={handleChange} required>
              <option value="+44" >+44</option>
              <option value="+1">+1</option>
            </select>
          <input  className="col-span-4 bg-gray-100  rounded-lg text-lg focus:border-black-10 p-2 block" type="tel" placeholder="Phone Number" Name="Number" pattern="[0-9]*"value={formValues.Number} onChange={handleChange} required />
          <button className="block col-span-5 bg-gradient-to-r from-teal-400 to-teal-600 hover:bg-teal-700 rounded-lg text-lg focus:border-black-10 p-2 block text-white font-semibold" type="submit" >Next</button>            
      </div>
      </div>
      
      
      
  </form>
 </div>

        
    )

}
