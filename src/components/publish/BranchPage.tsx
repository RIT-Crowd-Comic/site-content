import styles from './BranchPage.module.css'

import { useEffect, useState } from 'react';
import { BranchHook, emptyPanelSet, PanelSet } from "./interfaces";
import Panel from './Panel'
import BranchPageControls from './BranchPageControls';
import {publishHandler} from '../../api/apiCalls'
import { useRouter } from 'next/navigation'

const BranchPage = () => {
    const [parId, setparId] = useState<number | undefined>();
    const [addingHook, setAddingHook] = useState(false);
    const [confirmHook, setConfirmHook] = useState<number>();
    const [selectedHook, setSelectedHook] = useState<{ panelIndex: number, hookIndex: number }>();
    const [panelSet, setPanelSet] = useState<PanelSet>({
        parent_branch_id: parId,
        panels: emptyPanelSet()
    });
    const [activePanel, setActivePanel] = useState(0);
    const activePanelHooks = () => panelSet.panels[activePanel].hooks;
    const setActivePanelHooks = (hooks: BranchHook[], panelIndex: number) => {
        const panels = panelSet.panels;
        panels[panelIndex].hooks = hooks;
        hooks.map(hook => {
            hook.current_panel_index = panelIndex;
        })
        setPanelSet({
            ...panelSet,
            panels
        });
    };
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    // load images from create page
    const [imageLinks, setImageLinks] = useState([
        "/comic-panels/first_panel.png",
        "/comic-panels/second_panel.png",
        "/comic-panels/third_panel.png"
    ]);

    // one time setup
    useEffect(() => {

        // retrieve comic images from create page using local storage
        const storedImageLinks = [
            localStorage.getItem("image-1") || imageLinks[0],
            localStorage.getItem("image-2") || imageLinks[1],
            localStorage.getItem("image-3") || imageLinks[2]
        ];

        setImageLinks(storedImageLinks);

        panelSet.panels[0].imgSrc = imageLinks[0];
        panelSet.panels[1].imgSrc = imageLinks[1];
        panelSet.panels[2].imgSrc = imageLinks[2];

        nextPanel(0);
        // selectHook(null);
    }, []);

    const isActive = (panelIndex: number) => activePanel === panelIndex;

    /**
     * 
     * @param direction positive for forward, negative for backward
     */
    const nextPanel = (increment: number) => {
        // constain to values -1, 0, 1
        if (addingHook) confirmBranchHook(activePanel);

        increment = Math.min(Math.max(Math.floor(increment), -1), 1);
        setActivePanel((3 + activePanel + increment) % 3);
    };

    const selectHook = (hookIndex: number) => {
        setSelectedHook({ panelIndex: activePanel, hookIndex });

        const removeBtn = document.querySelector('#remove-branch-hook') as HTMLButtonElement;
        if (removeBtn) {
            removeBtn.classList.toggle('selectedHook', selectedHook != undefined)
            removeBtn.disabled = selectHook == undefined;
        }
    }

    /*
    Adds a branch hook to ps with a new branch
    */
    const addBranchHook = () => {

        // if exceeding max limit, don't do anything
        if (panelSet.panels.reduce((length, panel) => length + panel.hooks.length, 0) >= 3) return;

        setAddingHook(true);
    }

    const confirmBranchHook = (panelIndex: number) => {
        setSelectedHook(undefined);
        setConfirmHook(panelIndex);
        setAddingHook(false);
    }

    /*
    Removes the most recent branch and returns that branch to default
    */
    const removeBranchHook = () => {
        const panels = panelSet.panels;
        panels[activePanel].hooks = panels[activePanel].hooks.filter(
            (_, i) => selectedHook?.hookIndex !== i
        );
        setPanelSet({
            ...panelSet,
            panels
        })
        setSelectedHook(undefined);
        setAddingHook(false);
    }

    /*
    NOTE - pushToLocalStorage will be replaced with a method to push all of the data to the database to be stored as a panel set. As it stands right 
    now there is no user set up which may cause issue with the data upload. Will need to provide some kind of guest or default user for database uploads 
    so that the database can work as intended.
    */
    //packages ps and then pushes it to local storage
    return (<>
        <main className={`${styles.body}`}>
            <div id={styles.publishContainer}>
                <div id={styles.publishSlideshow}>
                    <div className={`${styles.carouselInner} carousel-inner`}>
                        <div className={`${styles.comicPanelContainer} ${styles.carouselView} ${styles.active}`}>
                            <Panel
                                imgSrc={imageLinks[activePanel]}
                                hooks={activePanelHooks()}
                                setHooks={setActivePanelHooks}
                                addingHook={addingHook}
                                confirmHook={confirmHook}
                                selectedHook={selectedHook}
                                setSelectedHook={setSelectedHook}
                                setConfirmHook={setConfirmHook}
                                onHookClick={(_, hookIndex) => selectHook(hookIndex)}
                            ></Panel>
                        </div>
                        <a className={`${styles.carouselControlPrev}`} href="#publish-slideshow" role="button" data-slide="prev" onClick={() => nextPanel(-1)}>
                            <img  alt="previous button"/>
                            {/* <span className="carousel-control-prev-icon" aria-hidden="true"></span> */}
                            {/* <span className="sr-only">Previous</span> */}
                        </a>
                        <a className={`${styles.carouselControlNext}`} href="#publish-slideshow" role="button" data-slide="next" onClick={() => nextPanel(1)}>
                            <img  alt="next button"/>
                            {/* <span className="sr-only">Next</span> */}
                        </a>
                    </div>
                </div>
                <BranchPageControls
                    addingHook={addingHook}
                    addBranchHook={addBranchHook}
                    confirmBranchHook={() => confirmBranchHook(activePanel)}
                    removeBranchHook={removeBranchHook}
                    publish={async() =>{
                        const response = await publishHandler(panelSet);
                        console.log(response);

                        if(response instanceof Error){
                            const errorMessage = response.message || "An unknown error occurred";
                            setErrorMessage(`There was an error: ${errorMessage}`);
                        }
                        else{
                            const queryString = new URLSearchParams({panel_set_id: response.panel_set}).toString();
                            router.push(`/comic/?${queryString}`);
                        }    

                        /*
                        get the data on the page this was sent to
                            import { useRouter } from 'next/router';

                            const page = () => {
                                const router = useRouter();
                                const { id, name } = router.query;
                            }
                        */
                    }}
                branchCount={panelSet.panels.reduce((length, panel) => length + panel.hooks.length, 0)}
                ></BranchPageControls>
                     {errorMessage && <div id="errorPublish" style={{color: 'white'}}> {errorMessage} </div>}
                {/* <div className={`${styles.buttonContainer}`}>
                    <div className={`${styles.branchHooks}`}>
                        <div id={`${styles.branchHookControls}`}>
                            {
                                addingHook ? <button id="add-branch-hook" className={`${styles.branchControlBtn} ${styles.selectedHook}`} onClick={() => confirmBranchHook(activePanel)}>Accept Hook</button> :
                                    <button id="add-branch-hook" className={`${styles.branchControlBtn}`} onClick={addBranchHook}>Add Hook</button>
                            }
                            {/* <button id="add-branch-hook" className="branch-control-btn" onClick={addBranchHook}>Add Hook</button> }
                            <button id="remove-branch-hook" className={`${styles.branchControlBtn}`} onClick={removeBranchHook}>Remove Hook</button>
                        </div>
                        <div className={`${styles.branchHookText}`}>
                            <p>{panelSet.panels.reduce((length, panel) => length + panel.hooks.length, 0)} OF 3 REQUIRED BRANCHES PLACED</p>
                            {/* starting text to be updated when either add or remove branch hook button is pressed }
                        </div>
                    </div>
                    <button onClick={pushToLocalStorage} id={`${styles.publishBtn}`}>Publish</button>
                </div> */}
            </div>
        </main>
    </>);
}

export default BranchPage;