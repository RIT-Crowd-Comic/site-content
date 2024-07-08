import { MouseEventHandler } from 'react';
import styles from './BranchPageControls.module.css'

const BranchPageControls = ({
    addingHook,
    addBranchHook,
    confirmBranchHook,
    removeBranchHook,
    branchCount
}: {
    addingHook: boolean,
    addBranchHook: MouseEventHandler<HTMLButtonElement>,
    confirmBranchHook: () => void,
    removeBranchHook: MouseEventHandler<HTMLButtonElement>,
    branchCount: number
}) => {
    {/* Return both mobile-landscape and desktop view. Either will be hidden in css */ }
    return (<>
        <div className={`${styles.buttonContainer} ${styles.landscape}`}>
            <div id={`${styles.branchHookControls}`}>
                {addingHook ?
                    <button id={`${styles.confirmBranchHook}`}
                        className={`${styles.branchControlBtn}`}
                        onClick={confirmBranchHook}
                    ></button> :
                    <button
                        id={`${styles.addBranchHook}`}
                        className={`${styles.branchControlBtn}`}
                        onClick={addBranchHook}
                    ></button>
                }
                {/* <button id="add-branch-hook" className="branch-control-btn" onClick={addBranchHook}>Add Hook</button> */}
                <button id={`${ addingHook ? styles.cancelBranchHook : styles.removeBranchHook}`} className={`${styles.branchControlBtn}`} onClick={removeBranchHook}></button>
            </div>
            <div className={`${styles.branchHookText}`}>
                <p>{branchCount} / 3</p>
                {/* starting text to be updated when either add or remove branch hook button is pressed */}
            </div>
        </div>
        {/* PORTRAIT BUTTONS */}
        <div className={`${styles.buttonContainer} ${styles.portrait}`}>
            <div className={`${styles.branchHooks}`}>
                <div id={`${styles.branchHookControls}`}>
                    {
                        addingHook ? <button id={`${styles.addBranchHook}`} className={`${styles.branchControlBtn} ${styles.selectedHook}`} onClick={confirmBranchHook}>Accept Hook</button> :
                            <button id={`${styles.addBranchHook}`} className={`${styles.branchControlBtn}`} onClick={addBranchHook}>Add Hook</button>
                    }
                    {/* <button id="add-branch-hook" className="branch-control-btn" onClick={addBranchHook}>Add Hook</button> */}
                    <button id={`${styles.removeBranchHook}`} className={`${styles.branchControlBtn}`} onClick={removeBranchHook}>Remove Hook</button>
                </div>
                <div className={`${styles.branchHookText}`}>
                    <p>{branchCount} OF 3 REQUIRED BRANCHES PLACED</p>
                    {/* starting text to be updated when either add or remove branch hook button is pressed */}
                </div>
            </div>
            <button onClick={() => { }} id={`${styles.publishBtn}`}>Publish</button>
        </div>
    </>)
}

export default BranchPageControls;