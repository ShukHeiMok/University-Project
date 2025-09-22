import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';

export const LineChart = () => {
    const OData=[
        {"label":"A",order: 10},
        {"label":"B",order: 20},
        {"label":"C",order: 30},
        {"label":"D",order: 40},
        {"label":"E",order: 50},
    ]   
 return(
    <>
    <h1>HI</h1>
    <Line
        data={{
            labels: OData.map((d) => d.label),
            datasets:[
                {
                    label:"HI",
                    data: OData.map((d)=>d.order)
                    
                }
            ],

        }}
    
    
    />




</>

    
 )   
}

