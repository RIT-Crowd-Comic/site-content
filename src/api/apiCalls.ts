const baseUrl = 'http://localhost:4000';

const getAPICall = async (url: string) => {
    return await fetch(`${baseUrl}${url}`,{
        headers: { "Content-Type": "application/json" },
        method: 'GET'
    }).then(response => {
        return response.json();

    }).then(json => {
        if(json.message) {
            return json.message
        }
        return json;

    }).catch((error) => {
        return error;
      });
};

const postAPICall = async (url: string, body: object) => {
    return await fetch(`${baseUrl}${url}`,{
        body: JSON.stringify(body),
        method: 'POST',
        headers: { "Content-Type": "application/json" },
    }).then(response => {
        return response.json();

    }).then(json => {
        if(json.message) {
            return json.message
        }
        return json;

    }).catch((error) => {
        return error;
      });
}

/**
 * Get hook based on its id
 * @param id the id of the hook
 * @returns either the hook itself or an error message
 */
const getHookByID =  async (id: number) => {
    return await getAPICall(`/hook/${id}`);
};

/**
 * Gets an image based on the id
 * @param id the id of the image
 * @returns 
 */
const getImageByID = async (id: number) => {
    return await getAPICall(`/getImage/${id}`)
}

/**
 * Get a panel
 * @param id the id of the panel
 * @returns 
 */
const getPanelByID = async (id: number) => {
    return await getAPICall(`/panel/${id}`)
}


/**
 * Get all of the hooks within a panel
 * @param panelID the id of the panel
 * @returns 
 */
const getHooksFromPanel = async(panelID: number) => {
    return await getAPICall(`/panel/${panelID}/hooks/`)
}

/**
 * Get a panel set
 * @param id the id of the panel
 * @returns 
 */
const getPanelSetByID = async (id: number) => {
    return await getAPICall(`/panel_set/${id}`);
}

/**
 * Get all the panels from a panel set
 * @param panelSetID the id of the panel set
 * @returns 
 */
const getPanels = async (panelSetID: number) => {
    return await getAPICall(`/panel_set/${panelSetID}/panels/`)
}

/**
 * Get a panel based on the index
 * @param panelSetID the id of the panel set
 * @param index the index of the panel
 */
const getPanelByIndex = async (panelSetID: number, index: number) => {
    return await getAPICall(`/panel_set/${panelSetID}/${index}/panel`)

}

/**
 * Get a user
 * @param id the id of the user
 * @returns 
 */
const getUser = async (id: string) => {
    return await getAPICall(`/user/${id}/`)
}

/**
 * Get all of the trunk panel sets
 * @returns 
 */
const getTrunks = async() => {
    return await getAPICall(`/trunks`);
}

/**
 * Get all panel sets from a user
 * @param id the id of the user
 */
const getPanelSets = async (id: string) => {
    return await getAPICall(`/user/${id}/panel_sets/`)
}

/**
 * Creates a new user
 * @param email email of the user
 * @param displayName display name of the user
 * @param password password of the user
 * @returns 
 */
const createUser = async (email: string, displayName: string, password: string) => {
    return await postAPICall(`/createUser`, {
        password: password,
        email: email,
        display_name: displayName
    })
}

/**
 * Creates a new panel
 * @param author_id the id of the user who created the panel set
 */
const createPanelSet = async (authorID: string) => {
    return await postAPICall(`/createPanelSet`, {
        author_id: authorID
    })
}


/**
 * Creates a panel
 * @param image the image the panel will hold
 * @param panelSetID the panel set the panel will be a part of
 * @returns 
 */
const createPanel = async (image: string, panelSetID: number) => {
    return await postAPICall(`/createPanel`, {
        image: image,
        panel_set_id: panelSetID
    })
}

/**
 * Create a hook
 * @param position where the hook will be
 * @param currentPanelID which panel the hook will be a part of
 * @param nextPanelSetID the next panel set the hook leads to
 * @returns 
 */
const createHook = async (position: object[], currentPanelID: number, nextPanelSetID: number) => {
    return await postAPICall(`/createHook`, {
        position: position,
        current_panel_id: currentPanelID,
        next_panel_set_id: nextPanelSetID,
    })
}

/**
 * Tells if a hook leads anywhere
 * @param id the id of the hook
 * @returns if the hook's next_panel_set_id is null (or undefined if the hook can't be found)
 */
const isHookLinked = async(id: number) => {
    const hook = await getHookByID(id);
    console.log(hook)
    //could not find hook with id 100
    if(typeof hook !== "object") {
        return undefined;
    }
    return hook.next_panel_set_id != null;
}

/**
 * Check if the user's credentials are correct
 * @param email 
 * @param password 
 * @returns 
 */
const authenticate = async(email: string, password: string) => {
    return postAPICall(`/authenticate`, {
        email: email,
        password: password
    })
}

const changePassword = async(email :string, password :string, newPassword : string) => {
    return postAPICall(`/changePassword`, {
        email: email,
        password: password,
        newPassword: newPassword
    })
}



const changeDisplayName = async(email: string, password: string, display: string, newDisplayName: string) => {
    return postAPICall(`/changeDisplayName`, {
        email: email,
        password: password,
        display: display,
        newDisplayName: newDisplayName
    })
}

/**
 * Changes the image of a panel
 * @param id the id of the panel
 * @param image the new image of the panel
 * @returns 
 */
const updatePanel = async (id: number, image: string) => {
    return postAPICall(`/updatePanel`, {
        id: id,
        image: image
    });
}

//todo implement the following
// '/saveImage'
//'/getImage/:id
// '/addSetToHook'

export { getHookByID, createUser, createPanelSet, createPanel, createHook, getPanelSets, isHookLinked, getPanelByID, getHooksFromPanel, getPanelSetByID, getUser, getTrunks, getPanelByIndex, authenticate, changePassword, changeDisplayName, updatePanel }