import React from 'react';
import './App.css';


export const DashB1 = ({waiting, approved,ready, collected,patient, med}) => {

    return (
    <>
        <div>
            <h1>waiting : {waiting}</h1>
            <h1>approved : {approved}</h1>
            <h1>ready : {ready}</h1>
            <h1>collected : {collected}</h1>
        </div>
        <div>
            {patient.map((p)=><h1>Hi {p.FirstN}</h1>)}
            <h1>Here is a summary of your medical information</h1><br/  >
            {patient.map((p)=><h1>{p.FirstN} {p.SurN}|{p.Sex}</h1>)}
            {patient.map((p)=><h1>{p.TelNum}|{p.DOB}</h1>)}
            {patient.map((p)=><h1>{p.RegGP}|{p.RegPharm}</h1>)}

        
        </div>
        <div>
            {med.map((me)=> me.map((m)=><h1>{m.Name}</h1>) )}
            
        
        </div>



    </>
        
        

      )
  
  }

