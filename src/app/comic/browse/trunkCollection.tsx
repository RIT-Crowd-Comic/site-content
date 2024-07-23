'use client';
import { useEffect, useState } from "react";
import Trunk from "./trunk";
import * as apiCalls from "../../../api/apiCalls"
import Card from "@/components/Card";

interface PanelSet {
    id : number,
    name: string,
    images: string[],
}

const TrunkCollection = () =>  {
    const [panelSets, setPanelSets] = useState<PanelSet[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    useEffect(() => {
       async function fetchData() {
          setIsLoading(true);
          const trunkResponse = await apiCalls.getTrunks();
          
          if(!updateError(trunkResponse)) {
            const panelSets = [];
            const imagesResponse = await Promise.all(trunkResponse.map(async (panelSet: any) => await apiCalls.getAllImageUrlsByPanelSetId(panelSet.id)));
            console.log(imagesResponse)
            if(!imagesResponse.some((response) => updateError(response))) {
               for(let i = 0; i < trunkResponse.length; i++) {
                  const panelSet = trunkResponse[i];
                  const images = imagesResponse[i];
                  panelSets.push({id: panelSet.id, name: panelSet.name, images: images.map((image: any) => image.url)} as PanelSet)
               }

               panelSets.forEach(ps => console.log(ps.images[0]))
               setPanelSets(panelSets);
            }

          } 
          setIsLoading(false);
       }
       fetchData();
    }, []);
    
    function updateError(foo: object) {
      const bool = foo instanceof Error;
      if(bool) {
          setError(foo.message);
      }
      return bool;
    }

    if (isLoading) {
       return <div>Loading...</div>;
    }
    if(error !== "") {
        return <div>{error}</div>;
    }
    if (panelSets.length > 0) {
       return <ul>{panelSets.map((ps : PanelSet) => (<Card topString={ps.name} staticPhoto={ps.images[0]} hoverPhoto={ps.images[1]} link={`/comic?id=${ps.id}`} bottomString={`Author Name | Jul 22, 2024`} year=""></Card>))}</ul>;
    }
    return <div>No trunks found</div>;
 }

export default TrunkCollection;



