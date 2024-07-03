const baseUrl = 'http://localhost:4000';

const getAPICall = async (url: string, body = {
}) => {
    return await fetch(`${baseUrl}${url}`,{
        mode: 'no-cors',
        headers: { "Content-Type": "application/json" },
        method: 'GET'
    }).then(response => {
        console.log('a')
        return response.json();

    }).then(json => {
        return json.message
    }).catch((error) => {
        console.log(error)
      });;
};

const getHookByID =  async (id: number) => {
    return await getAPICall(`/hook/${id}`);
};

export { getHookByID }