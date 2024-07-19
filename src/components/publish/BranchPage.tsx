import styles from './BranchPage.module.css'

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Hook, emptyPanelSet, PanelSet } from "../interfaces";
import Panel from './Panel'
import BranchPageControls from './BranchPageControls';

const BranchPage = () => {
    const [addingHook, setAddingHook] = useState(false);
    const [confirmHook, setConfirmHook] = useState<number>();
    const [selectedHook, setSelectedHook] = useState<{ panelIndex: number, hookIndex: number }>();
    const [panelSet, setPanelSet] = useState<PanelSet>({
        id: 0,
        author_id: '',
        panels: emptyPanelSet(),
        previous_hook: undefined
    });
    const [activePanel, setActivePanel] = useState(0);
    const activePanelHooks = () => panelSet.panels[activePanel].hooks;
    const setActivePanelHooks = (hooks: Hook[], panelIndex: number) => {
        const panels = panelSet.panels;
        panels[panelIndex].hooks = hooks;
        setPanelSet({
            ...panelSet,
            panels
        });
    }

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
    const pushToLocalStorage = () => { }



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
                    publish={() => console.log(JSON.stringify(panelSet.panels))}
                branchCount={panelSet.panels.reduce((length, panel) => length + panel.hooks.length, 0)}
                ></BranchPageControls>
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