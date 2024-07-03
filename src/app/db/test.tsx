import { useState } from "react";
import * as apiCalls from "../../api/apiCalls"

function Test() {
  const [results, setResults] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userID, setUserID] = useState("");


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
        <button onClick={async () => setResults(await apiCalls.getHookByID(1))}>Get Hook By ID</button>
        {/* <button>Get Image</button>
        <button>Get Panel By ID</button>
        <button>Get Panel Hooks</button>
        <button>Get Panel Set</button>
        <button>Get Panels</button>
        <button>Get Panel by Index</button>
        <button>Get User</button>
        <button>Get Panel Sets</button>
        <button>Get 404</button> */}
    </div>
  );
}

function parseResults(results: object | string) {
  return JSON.stringify(results);
}

export default Test;


