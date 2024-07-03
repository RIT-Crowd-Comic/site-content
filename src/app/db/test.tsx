import { useState } from "react";
import * as apiCalls from "../../api/apiCalls"

function Test() {
  const [results, setResults] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userID, setUserID] = useState("");
  const [imageName, setImageName] = useState("")
  const [panelSetID, setPanelSetID] = useState("")
  const [hookID, setHookID] = useState("")

   return (
    <div>
      <p>Results</p>
        <textarea value={results} readOnly></textarea> <br/>
        <hr />
        <p>email</p>
        <textarea onChange={(e) => setEmail(e.target.value)}></textarea>
        <p>display name</p>
        <textarea onChange={(e) => setDisplayName(e.target.value)}></textarea>
        <p>password</p>
        <textarea onChange={(e) => setPassword(e.target.value)}></textarea><br />
        <button onClick={async() => {setResults(parseResults(await apiCalls.createUser(email, displayName, password)))}}>Create User</button>
        <hr />
        <p>User ID</p>
        <textarea onChange={(e) => setUserID(e.target.value)}></textarea> <br />
        <button onClick={async() => {setResults(parseResults(await apiCalls.createPanelSet(userID)))}}>Create Panel Set</button>
        <hr />
        <p>Image Name</p>
        <textarea onChange={(e) => setImageName(e.target.value)}></textarea>
        <p>Panel Set ID</p>
        <textarea onChange={(e) => setPanelSetID(e.target.value)}></textarea><br />
        <button onClick={async() => {setResults(parseResults(await apiCalls.createPanel(imageName, Number(panelSetID))))}}>Create Panel</button> 
        <hr />
        <p>User ID</p>
        <textarea onChange={(e) => setUserID(e.target.value)}></textarea><br />
        <button onClick={async() => {setResults(parseResults(await apiCalls.getPanelSets(userID)))}}>Get All Panel Sets From User</button> <hr />
        <hr />
        <textarea name="" id=""></textarea>
    </div>
  );
}

function parseResults(results: object | string) {
  return JSON.stringify(results);
}

export default Test;


