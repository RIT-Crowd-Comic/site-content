const baseUrl = 'http://localhost:4000';
import { CreatePanelSet } from "../components/interfaces";
import { getSessionCookie } from "@/app/login/loginUtils";

const getAPICall = async (url: string) => {
    return await fetch(`${baseUrl}${url}`, {
        headers: { "Content-Type": "application/json" },
        method: 'GET'
    }).then(response => {
        return response.json();

    }).then(json => {
        return json;

    }).catch((error) => {
        return error;
    });
};

const postAPICall = async (url: string, body: object) => {
    const sessionObj = await getSessionCookie();
    const session = JSON.stringify(sessionObj);
    return await fetch(`${baseUrl}${url}`, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: { "Content-Type": "application/json",  "Session-Cookie": `${session}` },
    }).then(response => {
        return response.json();

    }).then(json => {
        return json;

    }).catch((error) => {
        return error;
    });
}

const postAPICallFormData = async (url: string, formData: FormData) => {
    const sessionObj = await getSessionCookie();
    const session = JSON.stringify(sessionObj);
    return await fetch(`${baseUrl}${url}`, {
      body: formData,
      headers:{ "Session-Cookie": `${session}`},
      method: 'POST',
    })
    .then(response =>{return response.json()})
    .then(json => {
      return json;
    })
    .catch(error => {
         return error;
    });
}

/**
 * Get hook based on its id
 * @param id the id of the hook
 * @returns either the hook itself or an error message
 */
const getHookByID = async (id: number) => {
    const hook = await getAPICall(`/hook/${id}`);
    if (hook.message) {
        return Error(hook.message);
    }
    return hook;
};

/**
 * Gets an image based on the id
 * @param id the id of the image
 * @returns the url of the image
 */
const getImageByID = async (id: number) => {
    const image = await getAPICall(`/getImage/${id}`);
    if (image.message) {
        return Error(image.message);
    }
    return image;
}

/**
 * Get a panel
 * @param id the id of the panel
 * @returns the API response which is either a panel set under a specific id or an Error message. A correct response will have the following properties:
 *  image: (id of user)
 *  index: (index of panel in panel set)
 *  panel_set_id: (id of parenting panel set)
 */
const getPanelByID = async (id: number) => {
    const panel = await getAPICall(`/panel/${id}`);
    if (panel.message) {
        return Error(panel.message);
    }
    return panel;
}


/**
 * Get all of the hooks within a panel
 * @param panelID the id of the panel
 * @returns the API response which is either an array of hookd under a specific panel id or an Error message. A correct response will have the following properties:
 *  [{
 * id: (id of hook)
 * position: [ x, y ] (an array of x & y values for positioning of the hook)
 * current_panel_id: (id of the panel the hook is on)
 * next_panel_set_id: (id of the panel set that the hook leads to)
 * },] 
 */
const getHooksFromPanel = async (panelID: number) => {
    const panel_hooks = await getAPICall(`/panel/${panelID}/hooks/`);
    if (panel_hooks.message) {
        return Error(panel_hooks.message);
    }
    return panel_hooks;
}

/**
 * Get a panel set
 * @param id the id of the panel
 * @returns the API response which is either a panel set under a specific id or an Error message. A correct response will have the following properties:
 *  id: (id # of panel set)
 *  author_id: (id of user)
 */

const getPanelSetByID = async (id: number) => {
    const panel_set = await getAPICall(`/panel_set/${id}`);
    if (panel_set.message) {
        return Error(panel_set.message);
    }
    return panel_set;
}

/**
 * Get all the panels from a panel set
 * @param panelSetID the id of the panel set
 * @returns the API response which is either the panel sets under a specific user id or an Error message. A correct response will have the following properties:
 */
const getPanels = async (panelSetID: number[]) => {
    const panels = await getAPICall(`/panel_sets/${panelSetID.join("-")}/panels/`);
    if (panels.message) {
        return Error(panels.message);
    }
    return panels;
}

/**
 * Get a panel based on the index
 * @param panelSetID the id of the panel set
 * @param index the index of the panel
 *  * @returns the API response which is either a panel set under a specific id or an Error message. A correct response will have the following properties:
 *  id: (id # of panel)
 *  image: (path to image)
 */
const getPanelByIndex = async (panelSetID: number, index: number) => {
    const panel = await getAPICall(`/panel_set/${panelSetID}/${index}/panel`);
    if (panel.message) {
        return Error(panel.message);
    }
    else return panel;
}

/**
 * Get a user
 * @param id the id of the user
 * @returns the API response which is either a user under a specific user id or an Error message. A correct response will have the following properties:
 *  email: (email of user)
 *  display_name: (display name of user)
 *  id: (id of user)
 */
const getUser = async (id: string) => {
    const user = await getAPICall(`/user/${id}/`);
    if (user.message) {
        return Error(user.message);
    }
    else return user;
}

/**
 * Get all of the trunk panel sets
 * @returns the API response which is either an array of the panel sets under a specific user id or an Error message. A correct response will have the following properties:
 *  [{
 *  id: (id of panel set)
 *  author_id: (id of user)
 * }]
 */
const getTrunks = async () => {
    const trunks = await getAPICall(`/trunks`);
    if (trunks.message) {
        return Error(trunks.message);
    }
    else return trunks
}

/**
 * Get all panel sets from a user
 * @param id the id of the user
 * @returns the API response which is either an array of the panel sets under a specific user id or an Error message. A correct response will have the following properties:
 *  [{
 *  id: (id of panel set)
 *  author_id: (id of user)
 * }]
 */
const getPanelSets = async (id: string) => {
    const panel_sets = await getAPICall(`/user/${id}/panel_sets/`);
    if (panel_sets.message) {
        return Error(panel_sets.message);
    }
    else return panel_sets;
}

/**
 * Creates a new user
 * @param email email of the user
 * @param displayName display name of the user
 * @param password password of the user
 * @returns the API response as what was posted or an Error w/ message which must be handled since post method failed 
 */
const createUser = async (email: string, displayName: string, password: string) => {
    const api_response = await postAPICall(`/createUser`, {
        password: password,
        email: email,
        display_name: displayName
    })
    if (api_response.message) {
        return Error(api_response.message);
    }
    else return api_response;
}

/**
 * Creates a new panel
 * @param author_id the id of the user who created the panel set
 * @returns the API response as what was posted or an Error w/ message which must be handled since post method failed 
 */
const createPanelSet = async (authorID: string) => {
    const api_response = await postAPICall(`/createPanelSet`, {
        author_id: authorID
    });
    if (api_response.message) {
        return Error(api_response.message);
    }
    else return api_response;
}


/**
 * Creates a panel
 * @param image the image the panel will hold
 * @param panelSetID the panel set the panel will be a part of
 * @returns the API response as what was posted or an Error w/ message which must be handled since post method failed 
 */
const createPanel = async (image: string, panelSetID: number) => {
    const api_response = await postAPICall(`/createPanel`, {
        image: image,
        panel_set_id: panelSetID
    });
    if (api_response.message) {
        return Error(api_response.message);
    }
    else return api_response;
}

/**
 * Create a hook
 * @param position where the hook will be
 * @param currentPanelID which panel the hook will be a part of
 * @param nextPanelSetID the next panel set the hook leads to
 * @returns the API response as what was posted or an Error w/ message which must be handled since post method failed 
 */
const createHook = async (position: object[], currentPanelID: number, nextPanelSetID: number) => {
    const api_response = await postAPICall(`/createHook`, {
        position: position,
        current_panel_id: currentPanelID,
        next_panel_set_id: nextPanelSetID,
    })
    if (api_response.message) {
        return Error(api_response.message);
    }
    else return api_response;
}

/**
 * Tells if a hook leads anywhere
 * @param id the id of the hook
 * @returns if the hook's next_panel_set_id is null (or undefined if the hook can't be found)
 */
const isHookLinked = async (id: number) => {
    const response = await getHookByID(id);
    if (response.message) {
        return Error(response.message);
    }
    return response.next_panel_set_id != null;
}

/**
 * Check if the user's credentials are correct
 * @param email 
 * @param password 
 * @returns 
 */
const authenticate = async (email: string, password: string) => {
    const response = await postAPICall(`/authenticate`, {
        email: email,
        password: password
    })
    if (response.message) {
        return Error(response.message);
    }
    return response;
}

const changePassword = async (email: string, password: string, newPassword: string) => {
    const response = await postAPICall(`/changePassword`, {
        email: email,
        password: password,
        newPassword: newPassword
    })

    if (response.message) {
        return Error(response.message);
    }
    return response;
}
const getAllImageUrlsByPanelSetId = async (id: number) => {
    const response = await getAPICall(`/panel_set/${id}/images`);
    if(response.message) {
        return new Error(response.message)
    }
    return response;
}


const changeDisplayName = async (email: string, password: string, display: string, newDisplayName: string) => {
    const response = await postAPICall(`/changeDisplayName`, {
        email: email,
        password: password,
        display: display,
        newDisplayName: newDisplayName
    })

    if (response.message) {
        return Error(response.message);
    }
    return response;
}

/**
 * Changes the image of a panel
 * @param id the id of the panel
 * @param image the new image of the panel
 * @returns 
 */
const updatePanel = async (id: number, image: string) => {
    const response = await postAPICall(`/updatePanel`, {
        id: id,
        image: image
    });

    if (response.message) {
        return Error(response.message);
    }

    return response;
}

/**
 * Get a list of hooks from a panel set
 * @param id the id of the panel set
 * @returns 
 */
const getHooksFromPanelSetById = async(id: number) => {
    const api_response = await getAPICall(`/panel_sets/${id}/hooks`);
    if(api_response.message)
    {
        return Error(api_response.message);
    }
    else return api_response;
}

/**
 * Creates a session for a user in the database
 * @param user_id ID of the user to create session for
 * @returns 
 */
const insertSession = async (user_id: string) => {
    const api_response = await postAPICall('/createSession', {user_id: user_id});
    if(api_response.message)
    {
        return Error(api_response.message);
    }
    else return api_response;
};

/**
 * Get a session object
 * @param {string} session_id ID of the session to be queried from the DB
 * @returns 
 */
const getSession = async (session_id: string) => {
    const api_response = await getAPICall(`/session/${session_id}`);
    if(api_response.message)
    {
        return Error(api_response.message);
    }
    else return api_response;
};

/**
 * Get a user by providing a session id
 * @param {string} session_id ID of the session associated with the desired user
 * @returns 
 */
const getUserBySession = async (session_id: string) => {
    const api_response = await getAPICall(`/session/${session_id}/user`);
    if(api_response.message) return Error(api_response);
    else return api_response;
}

type hook = {
    position: { x: number; y: number; }[]
    panel_index: number
}

const fetchImage = async(imageUrl : string) =>{
    return fetch(imageUrl)
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob(); // Convert response to Blob
    })
    .then(blob => {
        const imageFile = new File([blob], 'image.jpg', { type: blob.type }); // Create a File object
        return(imageFile); // Now you have a File object
        // You can now use imageFile as needed
    })
    .catch(error => {
        return error;
    });
}

const publishHandler = async(panelSet : CreatePanelSet) =>{
        //get the image files
        const image1 = await fetchImage(panelSet.panels[0].imgSrc) as File | Error;
        if(image1 instanceof Error) return new Error(`There was an error getting the 1st image: ${image1.message}`);
        const image2 = await fetchImage(panelSet.panels[0].imgSrc) as File | Error;
        if(image2 instanceof Error) return new Error(`There was an error getting the 1st image: ${image2.message}`);
        const image3 = await fetchImage(panelSet.panels[0].imgSrc) as File | Error;
        if(image3 instanceof Error) return new Error(`There was an error getting the 1st image: ${image3.message}`);

        //get the hook data
        const hooks  = [] as Array<hook>;

        panelSet.panels.map( panel =>{
            panel.hooks.map(hook =>{
                const positions = hook.points.map(point =>{
                   return{
                        x: point[0],
                        y: point[1]
                    }
                })
                hooks.push(
                    {
                        position: positions,
                        panel_index: hook.current_panel_index
                    }
                )
            })
        })

        //get the hookId
        const parentHookID = panelSet.previous_hook?.id;

        //get the hook id
        return await publish(image1, image2, image3, hooks, parentHookID);
}
const publish = async (image1 : File, image2 : File, image3 : File, hooks : Array<hook>, hookId : number | undefined) => {
    const data = {
        hook_id: hookId,
        hooks: hooks
    };
    const formData = new FormData();
    formData.append('image1', image1);
    formData.append('image2', image2);
    formData.append('image3', image3);
    formData.append('data', JSON.stringify(data, null, 2));
    const response = await postAPICallFormData(`/publish`, formData );
    
    if(response.message) return new Error(response.message);
    return response;
}

export { getAllImageUrlsByPanelSetId, getHookByID, createUser, createPanelSet, createPanel, createHook, getPanelSets, isHookLinked, getPanelByID, getHooksFromPanel, getPanelSetByID, getUser, getTrunks, getPanelByIndex, authenticate, changePassword, changeDisplayName, updatePanel, getHooksFromPanelSetById, insertSession, getSession, publishHandler, getUserBySession }
