import styles from './Key.module.css';
import { KeyPoint } from '../interfaces';

/**
 * will be given an array of key value object pairs
 * each pair will be a new pair for the page key
 * each will be put into an li that is put into a ul
 * @param values :Props[]  
 * @returns 
 */
const Key = (values:KeyPoint[])=>{
    console.log('key!!!!');
    return (
        <ul>
            {
                values.map((v)=>{
                    console.log(v.bullet);
                    return (
                        <li className={`${v.bullet ? styles.keyBullet : ''}`}>
                            <div style={{ background: `${v.key}` }} className={`${styles.keyIcons}`} />
                            {v.value}
                        </li>
                    );

                })
            }
        </ul>
    );
};
export default Key;
