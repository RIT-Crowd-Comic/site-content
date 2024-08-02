import { MouseEventHandler } from 'react';
import styles from './BranchPageControls.module.css'

const HookPageControls = ({
    addingHook,
    addHook,
    confirmHook,
    removeHook,
    publish,
    hookCount
}: {
    addingHook: boolean,
    addHook: MouseEventHandler<HTMLButtonElement>,
    confirmHook: () => void,
    removeHook: MouseEventHandler<HTMLButtonElement>,
    publish: () => void,
    hookCount: number
}) => {
    {/* Return both mobile-landscape and desktop view. Either will be hidden in css */ }
    return (<>
        <div className={`${styles.buttonContainer} ${styles.landscape}`}>
            <div id={`${styles.branchHookControls}`}>
                {addingHook ?
                    <button id={`${styles.confirmBranchHook}`}
                        className={`${styles.branchControlBtn}`}
                        onClick={confirmHook}
                    ></button> :
                    <button
                        id={`${styles.addBranchHook}`}
                        className={`${styles.branchControlBtn}`}
                        onClick={addHook}
                    ></button>
                }
                {/* <button id="add-branch-hook" className="branch-control-btn" onClick={addBranchHook}>Add Hook</button> */}
                <button id={`${ addingHook ? styles.cancelBranchHook : styles.removeBranchHook}`} className={`${styles.branchControlBtn}`} onClick={removeHook}></button>
            </div>
            <div className={`${styles.branchHookText}`}>
                <p>{hookCount} / 3</p>
                {/* starting text to be updated when either add or remove branch hook button is pressed */}
            </div>
        </div>
        {/* PORTRAIT BUTTONS */}
        <div className={`${styles.buttonContainer} ${styles.portrait}`}>
            <div className={`${styles.branchHooks}`}>
                <div id={`${styles.branchHookControls}`}>
                    {
                        addingHook ? <button id={`${styles.addBranchHook}`} className={`${styles.branchControlBtn} ${styles.selectedHook}`} onClick={confirmHook}>Accept Hook</button> :
                            <button id={`${styles.addBranchHook}`} className={`${styles.branchControlBtn}`} onClick={addHook}>Add Hook</button>
                    }
                    {/* <button id="add-branch-hook" className="branch-control-btn" onClick={addBranchHook}>Add Hook</button> */}
                    <button id={`${styles.removeBranchHook}`} className={`${styles.branchControlBtn}`} onClick={removeHook}>Remove Hook</button>
                </div>
                <div className={`${styles.branchHookText}`}>
                    <p>{hookCount} OF 3 REQUIRED BRANCHES PLACED</p>
                    {/* starting text to be updated when either add or remove branch hook button is pressed */}
                </div>
            </div>
            <button onClick={publish} id={`${styles.publishBtn}`}>
                <img alt="publish button"/>
            </button>
        </div>
    </>)
}

export default HookPageControls;