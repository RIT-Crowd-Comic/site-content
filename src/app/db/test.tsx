import { useState } from "react";
import * as apiCalls from "../../api/apiCalls"

function Test() {
   return (
    <div>
        <button onClick={async () => console.log(await apiCalls.getHookByID(1))}>Get Hook By ID</button>
    </div>
  );
}

function updateTextField(string : string) {

}

export default Test;


