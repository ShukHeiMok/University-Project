
import './App.css';
import React, { useState } from 'react';
import {Personalform} from './Personal'; 
import {Address} from './AddressRegister';
import {GPSelect} from './GPSelect';  
import {Password} from './PasswordRegister'; 



export const ParentComponent = () => {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    personal: {},
    address: {},
    gp: {},
    password:{},
   
  });
  
  
{/*GP List for linking to GP*/}
  const G= [
    {id:1, content: "A"},{id:2, content: "B"}];

  {/*submit function*/}
  const handleFormSubmit = (values, name) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: values,
    }));

    {/*clear data after the last step*/}
    if(step===4){
        localStorage.removeItem('addressFormData');
        localStorage.removeItem('personalFormData');
        localStorage.removeItem('gpFormData');
        localStorage.removeItem('passwordFormData');
        }
    setStep((prevStep) => prevStep + 1);
    
  };

  {/*Return function*/}
  const handleReturnToPreviousForm = () => {
    setStep((prevStep) => prevStep - 1);
  };

  {/*Exit function*/}
  const handleExit=()=>{
    setStep((prevStep)=>0);
    localStorage.removeItem('addressFormData');
    localStorage.removeItem('personalFormData');
    localStorage.removeItem('gpFormData');
    localStorage.removeItem('passwordFormData');
  };

  {/*Variable for password heck */}
  const passcheck = formValues.personal ;
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      {step === 1 && (
        <Personalform
          onSubmit={(values) => handleFormSubmit(values, 'personal')}
          initialValues={{ personal: formValues.personal }}
          onExit={handleExit}
        />
      )}
      {step === 2 && (
        <Address
          onSubmit={(values) => handleFormSubmit(values, 'address')}
          onReturn={handleReturnToPreviousForm}
          onExit={handleExit}
          initialValues={{ address: formValues.address }}
        />
      )}
      {step === 3 && (
        <GPSelect
          onSubmit={(values) => handleFormSubmit(values, 'gp')}
          onReturn={handleReturnToPreviousForm}
          onExit={handleExit}
          initialValues={{ gp: formValues.gp }}
          storedg={G}
        />
      )}
      {
      step === 4 && (
        <Password
          onSubmit={(values) => handleFormSubmit(values, 'password')}
          onReturn={handleReturnToPreviousForm}
          onExit={handleExit}
          initialValues={{ password: formValues.password }}
          patientname={passcheck.personal.Name }
          patientemail={passcheck.personal?.Email.split('@')[0] }
        />
      )}
      {step===5 && (<h1>DONE</h1>)}
      {step===0 &&(<h1>Exit</h1>) }
      </div>
      
  );
};

