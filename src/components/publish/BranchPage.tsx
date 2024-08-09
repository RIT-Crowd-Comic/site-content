import styles from './BranchPage.module.css';
import { useEffect, useState } from 'react';
import { CreateHook, emptyPanelSet, CreatePanelSet } from '../interfaces';
import Panel from './PublishPanel';
import BranchPageControls from './BranchPageControls';
import InfoBox from '../info/InfoBox';
import InfoBtn from '../info/InfoBtn';
import { publishHandler } from '../../api/apiCalls';
import { useRouter } from 'next/navigation';
import { getHookByID } from '../../api/apiCalls';
import { addToastFunction } from '../toast-notifications/interfaces';
import Loader from '../loader/Loader';

interface Props {
 id : number;
 sendError : addToastFunction
}
const PublishPage = ({ id, sendError }: Props) => {
    const [addingHook, setAddingHook] = useState(false);
    const [parentHookId, setParentHookId] = useState<number>();
    const [confirmHook, setConfirmHook] = useState<number>();
    const [selectedHook, setSelectedHook] = useState<{ panelIndex: number, hookIndex: number }>();
    const [instructionsVisible, setInstructionsVisible] = useState<boolean>(false);
    const [panelSet, setPanelSet] = useState<CreatePanelSet>({
        id:        0,
        author_id: '',
        panels:    emptyPanelSet(),
    });
    const [activePanel, setActivePanel] = useState(0);
    const [showLoader, setShowLoader] = useState(false);

    const activePanelHooks = () => panelSet.panels[activePanel].hooks;
    const setActivePanelHooks = (hooks: CreateHook[], panelIndex: number) => {
        const panels = panelSet.panels;
        panels[panelIndex].hooks = hooks;
        hooks.map(hook => {
            hook.current_panel_index = panelIndex;
        });
        setPanelSet({
            ...panelSet,
            panels
        });
    };
    const router = useRouter();


    // load images from create page
    const [imageLinks, setImageLinks] = useState([
        '/comic-panels/first_panel.png',
        '/comic-panels/second_panel.png',
        '/comic-panels/third_panel.png'
    ]);

    const loadImageAndConvertToURL = (svgString: string | null) => {
        if (svgString) {

            // if create page doesn't upload svg
            if (!svgString.includes('<svg')) {
                svgString = svgString.replace('<g', '<svg');
                svgString = svgString.replace('/g>', '/svg>');
            }

            // Convert the SVG string to a data URL
            // Encode the SVG string in Base64
            const encoded = btoa(unescape(encodeURIComponent(svgString)));

            // Create a data URL
            return `data:image/svg+xml;base64,${encoded}`;
        }
        return undefined;
    };

    // one time setup
    useEffect(() => {

        // check the id and reroute if needed
        // route if the link contains an id already created - get the hook by id and check its next
        getHookByID(id).then((hook) => {
            if ((hook instanceof Error)) window.history.length > 2 ? window.history.go(-1) : router.push('/comic');

            hook = hook as CreateHook;

            if (!hook.next_panel_set_id) {
                setParentHookId(id);
                return;
            }

            // use the next id to reroute to read
            router.push(`/comic/?id=${hook.next_panel_set_id}`);
        });

        // retrieve comic images from create page using local storage
        const storedImageLinks = [
            loadImageAndConvertToURL(localStorage.getItem('image-1')) || imageLinks[0],
            loadImageAndConvertToURL(localStorage.getItem('image-2')) || imageLinks[1],
            loadImageAndConvertToURL(localStorage.getItem('image-3')) || imageLinks[2]
        ];

        setImageLinks(storedImageLinks);


        panelSet.panels[0].imgSrc = storedImageLinks[0];
        panelSet.panels[1].imgSrc = storedImageLinks[1];
        panelSet.panels[2].imgSrc = storedImageLinks[2];

        nextPanel(0);

        // selectHook(null);
    }, []);

    // const isActive = (panelIndex: number) => activePanel === panelIndex;

    /**
     * 
     * @param direction positive for forward, negative for backward
     */
    const nextPanel = (increment: number) => {

        // constain to values -1, 0, 1
        if (addingHook) confirmHookAndUnselect(activePanel);

        increment = Math.min(Math.max(Math.floor(increment), -1), 1);
        setActivePanel((3 + activePanel + increment) % 3);
    };

    const selectHook = (hookIndex: number) => {
        setSelectedHook({ panelIndex: activePanel, hookIndex });

        const removeBtn = document.querySelector('#remove-branch-hook') as HTMLButtonElement;
        if (removeBtn) {
            removeBtn.classList.toggle('selectedHook', selectedHook != undefined);
            removeBtn.disabled = selectHook == undefined;
        }
    };

    /*
    Adds a branch hook to ps with a new branch
    */
    const addHook = () => {

        // if exceeding max limit, don't do anything
        if (panelSet.panels.reduce((length, panel) => length + panel.hooks.length, 0) >= 3) return;

        setAddingHook(true);
    };

    const confirmHookAndUnselect = (panelIndex: number) => {
        setSelectedHook(undefined);
        setConfirmHook(panelIndex);
        setAddingHook(false);
    };

    /*
    Removes the most recent branch and returns that branch to default
    */
    const removeHook = () => {
        const panels = panelSet.panels;
        panels[activePanel].hooks = panels[activePanel].hooks.filter((_, i) => selectedHook?.hookIndex !== i);
        setPanelSet({
            ...panelSet,
            panels
        });
        setSelectedHook(undefined);
        setAddingHook(false);
    };

    return (
        <>
            <main className={`${styles.body}`}>
                <Loader show={showLoader} />
                <div id={styles.publishContainer}>
                    <div id={styles.publishSlideshow}>
                        <div className={`${styles.carouselInner} carousel-inner`}>
                            <div className={`${styles.comicPanelContainer} ${styles.carouselView} ${styles.active}`}>
                                <Panel
                                    imgSrc={imageLinks[activePanel]}
                                    hooks={activePanelHooks()}
                                    setHooks={(hooks, index) => setActivePanelHooks(hooks as CreateHook[], index)}
                                    addingHook={addingHook}
                                    confirmHook={confirmHook}
                                    selectedHook={selectedHook}
                                    setSelectedHook={setSelectedHook}
                                    setConfirmHook={setConfirmHook}
                                    onHookClick={(_, hookIndex) => selectHook(hookIndex)}
                                />
                            </div>
                            <a
                                className={`${styles.carouselControlPrev}`}
                                href="#publish-slideshow"
                                role="button"
                                data-slide="prev"
                                onClick={() => nextPanel(-1)}
                            >
                                <img alt="previous button" />
                                {/* <span className="carousel-control-prev-icon" aria-hidden="true"></span> */}
                                {/* <span className="sr-only">Previous</span> */}
                            </a>
                            <a
                                className={`${styles.carouselControlNext}`}
                                href="#publish-slideshow"
                                role="button"
                                data-slide="next"
                                onClick={() => nextPanel(1)}
                            >
                                <img alt="next button" />
                                {/* <span className="sr-only">Next</span> */}
                            </a>
                        </div>
                    </div>
                    <BranchPageControls
                        addingHook={addingHook}
                        addHook={addHook}
                        confirmHook={() => confirmHookAndUnselect(activePanel)}
                        removeHook={removeHook}
                        publish={async () => {
                            panelSet.previous_hook_id = parentHookId;
                            setShowLoader(true);
                            const response = await publishHandler(panelSet).then((r)=>{
                                setShowLoader(false);
                                return r;
                            });

                            if (response instanceof Error) {
                                console.log(response.message);
                                sendError('Something went wrong, ensure you are signed in and try again.', 'Error', false, 4000, true);
                            }
                            else {
                                const queryString = new URLSearchParams({ id: response.panel_set }).toString();

                                // Clear localStorage so that the user can create new panels in the future
                                localStorage.removeItem('panel-1-layerData');
                                localStorage.removeItem('panel-2-layerData');
                                localStorage.removeItem('panel-3-layerData');
                                localStorage.removeItem('image-1');
                                localStorage.removeItem('image-2');
                                localStorage.removeItem('image-3');

                                router.push(`/comic/?${queryString}`);
                            }
                        }}
                        hookCount={panelSet.panels.reduce((length, panel) => length + panel.hooks.length, 0)}
                    />
                </div>
                <InfoBtn setVisibility={setInstructionsVisible} />
                <InfoBox
                    text={`
            -click on the add hook button to start drawing a hook on the comic
            -once done, click on accept hook to keep or remove to delete the hook
             *hooks do have a minimum size and dimention so you can't make itty bitty unclickable hooks
            - to remove a hook: click on the hook you wish to remove then click on remove hook to delete it\n 
            *YOU MUSH HAVE 3 HOOKS IN ORDER TO PUBLISH YOUR COMIC*
            `}
                    visible={instructionsVisible}
                    setVisibility={setInstructionsVisible}
                />
            </main>
        </>
    );
};

export default PublishPage;
