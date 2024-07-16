'use client';
import { useEffect, useState } from "react";
import Trunk from "./trunk";
import * as apiCalls from "../../../api/apiCalls"
import { isArray } from "util";

interface PanelSet {
    id : number,
}
const TrunkCollection = () =>  {
    const [data, setData] = useState<PanelSet[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    useEffect(() => {
       async function fetchData() {
          setIsLoading(true);
          const response = await apiCalls.getTrunks();
          setIsLoading(false);
          if(response instanceof Error)
          {
            setError(response.message);
          }
          else
          {
            setData(response);
          }
       }
       fetchData();
    }, []);
    if (isLoading) {
       return <div>Loading...</div>;
    }
    if(error !== "") {
        return <div>{error}</div>;
    }
    if (data.length > 0) {
       return <ul>{data.map((ps : PanelSet) => (<Trunk name={ps.id.toString()} ></Trunk>))}</ul>;
    }
    return <div>No trunks found</div>;
 }

export default TrunkCollection;



