interface Props{
    key:string
    value:string;
    bullet:boolean;// weather or not it is bulletpointed 
}

/**
 * will be given an array of key value object pairs
 * each pair will be a new pair for the page key
 * each will be put into an li that is put into a ul
 * @param values :Props[]  
 * @returns 
 */
const Key = (values:Props[])=>{
    const container = document.createElement('ul');
    for (const v of values) {
        const li = document.createElement('li');
        const example = document.createElement('div');// the 'box' on the left that will be described

        const value = document.createTextNode(v.value);
        example.className = 'keyIcons';

        if (v.key != null) { // checks if there is a key at all 
            example.style.background = v.key;
            li.appendChild(example);
        }
        if (v.bullet) {
            example.className = 'keybullet';
        }

        li.appendChild(value);
        container.appendChild(li);
    }
    return ({ container });
};
export default Key;
