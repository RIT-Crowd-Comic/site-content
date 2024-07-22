import { useState } from "react";
import TrunkCollection from "./trunkCollection";
import NavBar from "@/components/NavBar";
import Card from "@/components/Card";
const Browse = () => {
    return (
        <div>
            <NavBar/> 
            <Card/>
            <TrunkCollection/>
        </div>
    );

}

export default Browse;