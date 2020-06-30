import React, { useEffect, useState } from 'react';
import * as d3 from "d3";
import { create } from 'domain';

function SunBurst ({ pieData, innerRadius, outerRadius }) {
  const [arcs, setArcs] = useState([]);
  const [sunburstData, setSunburstData] = useState([]);
  const [minCases, setMinCases] = useState();
  const [maxCases, setMaxCases] = useState();
  const createPie = d3
    .pie()
    .value(function(d) {return d.cases})

  let interpolate = d3.interpolateHslLong("blue", "red");

  useEffect(
    () => {
      let [min, max] = d3.extent(pieData.map(d => parseInt(d.cases)));
      setMinCases(min)
      setMaxCases(max);

      const data = createPie(pieData);
      console.log(data);
      let arcs = data.map( item => {
        let createTry = d3.arc()
          .innerRadius(120)
          .outerRadius(160)
          .startAngle(item.startAngle )
          .endAngle(item.endAngle);

          return createTry(item);
        
      });
      setSunburstData(data);
      setArcs(arcs);
    }, [pieData]
  )

  return(
    
    <div>
      <svg height={400} width={400}>
        <g transform={`translate(${200} ${200})`}>
          {arcs && arcs.map( (arc, index) => {
            console.log(sunburstData[index].data.cases, maxCases)
            console.log(interpolate(sunburstData[index].data.cases / maxCases));
            return(
              <path id={index} d={arc} fill={interpolate(sunburstData[index].data.cases / maxCases)}/>
            )
          })}
        </g>
      </svg>
        <div style={{backgroundColor: "blue"}}>{minCases}</div>
        <div style={{backgroundColor: "red"}}>{maxCases}</div>
    </div>
  )
}

export default SunBurst;
