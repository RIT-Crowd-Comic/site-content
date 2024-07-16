'use client';
import { useEffect, useState } from "react";
import Trunk from "./trunk";
import * as apiCalls from "../../../api/apiCalls"

interface PanelSet {
    id : number
}
const TrunkCollection = () =>  {
    const [data, setData] = useState(null) as any;
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
       async function fetchData() {
          setIsLoading(true);
          const response = await apiCalls.getTrunks();
          setIsLoading(false);
          if(response instanceof Error)
          {
            setData(response.message);
          }
          else
          {
            setData(response);
          }
          console.log(response);
       }
       fetchData();
    }, []);
    if (isLoading) {
       return <div>Loading...</div>;
    }
    if (data) {
       return <ul>{data.map((ps : PanelSet) => (<Trunk name={ps.id.toString()} > </Trunk>))}</ul>;
    }
    return <div>{data}</div>;
 }

export default TrunkCollection;



