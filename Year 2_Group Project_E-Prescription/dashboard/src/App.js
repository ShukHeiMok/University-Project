
import './App.css';
import React from 'react';
import {PDash} from './PatientDashBoard1';
import {GPDash} from './GPDashBoard'
import LineChart from './LineChart';
import MyCalendar from './cal';


const App = () => {
  //Status card data
  const WaitNum = 15;
  const ApprovedNum=35;
  const ReadyNum=2;
  const CollectedNum=120;
  const GPWaiting=45;
  const GPApproved=35

  //patient account info
 const patientinfo=[
    { FirstN:"Nicholas", SurN:"Jonas", Sex:"Male", TelNum:"+44 7877246821", DOB:"23-09-1998", RegGP:"Four Elms Infirmary", RegPharm:"Boots Queen St."}
  ];

  //Patient's medical table
  const medinfo=[
    {id: 1,Name:"ABCD", Type:"abcd", Dosage:"10mg", Status:"Active", Refill:"0", CollectDate:"22/03/23" },
    {id: 2,Name:"EFGH", Type:"efgh", Dosage:"20mg", Status:"Collected", Refill:"1", CollectDate:"22/03/23" }
  ]

  //GP account info
  const gpinfo=[
    { FirstN:"Sheila Marie", SurN:"Williams", Sex:"Female",  RegGP:"Four Elms Infirmary", GPNum:"H7840991FD"}
  ];

  //GP medical table
  const gpprescriptionmedinfo=[
    {id: 1,PName:"Jack Jones", med:"Penicilin", medinfo:"Phenicinm", Status:"Waiting", Refill:"Yes"  },
    {id: 2,PName:"Will Turner", med:"Morphine Sulfate", medinfo:"Dramorph", Status:"Waiting", Refill:"No"}
  ]

  //data for chart
  const lastyd=[
    {month:"Jan",order: 10},
    {month:"Feb",order: 30},
    {month:"Mar",order: 20},
    {month:"Apr",order: 10},
    {month:"May",order: 10},
    {month:"Jun",order: 40},
    {month:"Jul",order: 20},
    {month:"Aug",order: 5},
    {month:"Sep",order: 20},
    {month:"Oct",order: 30},
    {month:"Nov",order: 15},
    {month:"Dec",order: 21},
  ]

  const thisyd=[
    {month:"Jan",order: 30},
    {month:"Feb",order: 20},
    {month:"Mar",order: 50},
    {month:"Apr",order: 10},
    {month:"May",order: 1},
    {month:"Jun",order: 30},
    {month:"Jul",order: 22},
    {month:"Aug",order: 15},
    {month:"Sep",order: 24},
    {month:"Oct",order: 33},
    {month:"Nov",order: 40},
    {month:"Dec",order: 10},
  ]
 
  const highlightedDates = ['2024-04-09', '2024-04-16', '2024-04-23']; // Format: 'YYYY-MM-DD'

  return (
    <GPDash
    waiting={WaitNum}
    approved={ApprovedNum}
    gpwaiting={GPWaiting}
    gpapproved={GPApproved}
    gp={gpinfo}
    med={gpprescriptionmedinfo}
    thisd={thisyd}
    lastd={lastyd}
  />
  // <DashB1
  //   waiting={WaitNum}
  //   approved={ApprovedNum}
  //   ready={ReadyNum}
  //   collected={CollectedNum}
  //   patient={patientinfo}
  //   med={medinfo}
  //   thisd={thisyd}
  //   lastd={lastyd}
  // />
    

    
      
  );
};

export default App;