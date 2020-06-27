import React, { useEffect, useState } from 'react';
import * as d3 from "d3";
import { create } from 'domain';

function SunBurst ({ pieData, innerRadius, outerRadius }) {
  const [arcs, setArcs] = useState([]);
  const createPie = d3
    .pie()
    .value(function(d) {return d.cases})

  let interpolate = d3.interpolateHslLong("blue", "red");

  useEffect(
    () => {
      const data = createPie(pieData);
      console.log('data',data)
      let arcs = data.map( item => {
        let createTry = d3.arc()
          .innerRadius(120)
          .outerRadius(160)
          .startAngle(item.startAngle )
          .endAngle(item.endAngle);

          return createTry(item);
        
      });
      setArcs(arcs);
    }, [pieData]
  )

  return(
    
    <div>
      <svg height={400} width={400}>
        <g transform={`translate(${200} ${200})`}>
          {arcs && arcs.map( (arc, index) => {
            return(
              <path d={arc} fill={interpolate(index / (arcs.length - 1))}/>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

export default SunBurst;
