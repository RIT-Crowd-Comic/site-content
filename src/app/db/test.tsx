import { useState } from "react";
import * as apiCalls from "../../api/apiCalls"
import { parse } from "path";

function Test() {
  const [results, setResults] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [userID, setUserID] = useState("");
  const [imageName, setImageName] = useState("")
  const [panelSetID, setPanelSetID] = useState("")
  const [panelID, setPanelID] = useState("")
  const [hookID, setHookID] = useState("")
  const [index, setIndex] = useState("")
  const [newPassword, setNewPassword] = useState("")



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
        <p>email</p>
        <textarea onChange={(e) => setEmail(e.target.value)}></textarea>
        <p>password</p>
        <textarea onChange={(e) => setPassword(e.target.value)}></textarea><br />
        <button onClick={async() => {setResults(parseResults(await apiCalls.authenticate(email, password)))}}>Authenticate</button>
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
        <p>Panel ID</p>
        <textarea onChange={(e) => setPanelID(e.target.value)}></textarea>
        <p>Next Panel Set ID</p>
        <textarea onChange={(e) => setPanelSetID(e.target.value)}></textarea><br />
        <button onClick={async() => {setResults(parseResults(await apiCalls.createHook([{x: "1", y: "1"}], Number(panelID), Number(panelSetID))))}}>Create Hook</button> 
        <hr />
        <p>User ID</p>
        <textarea onChange={(e) => setUserID(e.target.value)}></textarea><br />
        <button onClick={async() => {setResults(parseResults(await apiCalls.getUser(userID)))}}>Get User By ID</button>
        <hr />
        <p>Panel Set ID</p>
        <textarea onChange={(e) => setPanelSetID(e.target.value)}></textarea><br />
        <button onClick={async() => {setResults(parseResults(await apiCalls.getPanelSetByID(Number(panelSetID))))}}>Get Panel Set By ID</button>
        <hr />
        <p>Panel ID</p>
        <textarea onChange={(e) => setPanelID(e.target.value)}></textarea>
        <p>Index</p>
        <textarea onChange={(e) => setIndex(e.target.value)}></textarea><br />
        <button onClick={async()=> {setResults(parseResults(await apiCalls.getPanelByID(Number(panelID))))}}>Get Panel By ID</button>
        <hr />
        <p>Panel ID</p>
        <textarea onChange={(e) => setPanelID(e.target.value)}></textarea><br />
        <button onClick={async() => {setResults(parseResults(await apiCalls.getPanelByIndex(Number(panelID), Number(index))))}}>Get Panel By Index</button>
        <hr />
        <p>Hook ID</p>
        <textarea onChange={(e) => setHookID(e.target.value)}></textarea> <br />
        <button onClick={async() => {setResults(parseResults(await apiCalls.getHookByID(Number(hookID))))}}>Get Hook By ID</button>
        <hr />
        <button onClick={async() => {setResults(parseResults(await apiCalls.getTrunks()))}}>Trunks</button>
        <p>Hook ID</p>
        <textarea onChange={(e) => setHookID(e.target.value)}></textarea> <br />
        <button onClick={async() => {setResults(parseResults(await apiCalls.isHookLinked(Number(hookID))))}}>Is Hook Linked</button>
        <hr />
        <p>User ID</p>
        <textarea onChange={(e) => setUserID(e.target.value)}></textarea><br />
        <button onClick={async() => {setResults(parseResults(await apiCalls.getPanelSets(userID)))}}>Get All Panel Sets From User</button>
        <hr />
        <p>Panel ID</p>
        <textarea onChange={(e) => setPanelID(e.target.value)}></textarea> <br />
        <button onClick={async() => {setResults(parseResults(await apiCalls.getHooksFromPanel(Number(panelID))))}}>Get Hooks From Panel</button>
        <hr />
        <p>Email</p>
        <textarea onChange={(e) => setEmail(e.target.value)}></textarea>
        <p>Password</p>
        <textarea onChange={(e) => setPassword(e.target.value)}></textarea>
        <p>New Password</p>
        <textarea onChange={(e) => setNewPassword(e.target.value)}></textarea> <br />
        <button onClick={async() => {setResults(parseResults(await apiCalls.changePassword(email, password, newPassword)))}}>Change Password</button>
        <hr />
        <p>Email</p>
        <textarea onChange={(e) => setEmail(e.target.value)}></textarea>
        <p>Password</p>
        <textarea onChange={(e) => setPassword(e.target.value)}></textarea>
        <p>Display</p>
        <textarea onChange={(e) => setDisplayName(e.target.value)}></textarea>
        <p>New Display Name</p>
        <textarea onChange={(e) => setNewDisplayName(e.target.value)}></textarea><br />
        <button onClick={async() => {setResults(parseResults(await apiCalls.changeDisplayName(email, password, displayName, newDisplayName)))}}>Change Display Name</button>
        <hr />
        <p>Panel ID</p>
        <textarea onChange={(e => setPanelID(e.target.value))}></textarea>
        <p>image</p>
        <textarea onChange={(e => setImageName(e.target.value))}></textarea> <br />
        <button onClick={async() => {setResults(parseResults(await apiCalls.updatePanel(Number(panelID), imageName)))}}>Update Panel</button>
    </div>
  );
}

function parseResults(results: any) {
  if(results === undefined)
    return "undefined";
  return JSON.stringify(results);
}

export default Test;


