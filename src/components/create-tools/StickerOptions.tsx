import { useRef, useState } from "react";
import styles from "@/styles/create.module.css";

interface Props
{
    enabled: Boolean;               // Should the HTML of this component be displayed on the page currently?
    setSticker: Function;        // Method for setting the url of the sticker tool
}

// *** Sticker Options is used in order to changed the different values associated with the sticker tool in CreateToolsCanvas ***
const StickerOptions = ({enabled, setSticker} : Props) =>
{
    const STICKER_COUNT = 22 //Must be increased when new stickers are added
    const [stickerChosen, setChosen] = useState<string[]>([])
    const [run, setRun] = useState(false)
    /*
    */
    if(!run){
        for(let i = 0; i < STICKER_COUNT; i++){
            stickerChosen.push("not"); //fills chosen array
        }
        setChosen(stickerChosen);
        setRun(true);
    }    

    const changeSticker = (target:string, index:number) => {
        setSticker(target);

        

        for(let i = 0; i < stickerChosen.length; i++){
            stickerChosen[i] = styles.not;
        }

        stickerChosen[index] = styles.chosen;
        setChosen(stickerChosen)
    }

    // If the component is set to be enabled, return HTML, otherwise, return nothing
    if(enabled)
    {
        return(
            <div id={styles.stickerTools} className={styles.toolStyles}>
                <h3>Sticker Tools</h3>
                <label id="bubbleLabel">Bubbles:</label><br/>
                <div id={styles.bubbleImgs}>
                    
                    <img className={stickerChosen[0]} src="/stickers/speechBubbleL.png" alt="Speech Bubble Left Sticker" onClick={() => changeSticker("/stickers/speechBubbleL.png", 0)}></img><br/>
                    <img className={stickerChosen[1]} src="/stickers/speechBubbleR.png" alt="Speech Bubble Right Sticker" onClick={() => changeSticker("/stickers/speechBubbleR.png", 1)}></img><br/>
                    <img className={stickerChosen[2]} src="/stickers/thoughtBubbleL.png" alt="Thought Bubble Left Sticker" onClick={() => changeSticker("/stickers/thoughtBubbleL.png", 2)}></img><br/>
                    <img className={stickerChosen[3]} src="/stickers/thoughtBubbleR.png" alt="Thought Bubble Right Sticker" onClick={() => changeSticker("/stickers/thoughtBubbleR.png", 3)}></img><br/>
                    <img className={stickerChosen[4]} src="/stickers/exclamationBubble.png" alt="Exclamation Bubble Sticker" onClick={() => changeSticker("/stickers/exclamation.png", 4)}></img><br/>
                    <img className={stickerChosen[5]} src="/stickers/detachedBubble.png" alt="Detached Bubble Sticker" onClick={() => changeSticker("/stickers/detachedBubble.png", 5)}></img><br/>
                    <img className={stickerChosen[6]} src="/stickers/woozyBubbleL.png" alt="Woozy Bubble Left Sticker" onClick={() => changeSticker("/stickers/woozyBubbleL.png", 6)}></img><br/>
                    <img className={stickerChosen[7]} src="/stickers/woozyBubbleR.png" alt="Woozy Bubble Right Sticker" onClick={() => changeSticker("/stickers/woozyBubbleR.png", 7)}></img><br/>
                    <img className={stickerChosen[8]} src="/stickers/dashBubbleL.png" alt="Dash Bubble Left Sticker" onClick={() => changeSticker("/stickers/dashBubbleL.png", 8)}></img><br/>
                    <img className={stickerChosen[9]} src="/stickers/dashBubbleR.png" alt="Dash Bubble Right Sticker" onClick={() => changeSticker("/stickers/dashBubbleR.png", 9)}></img><br/>
                </div>
                <label id="fxLabel">Word Effects:</label><br/>
                <div id={styles.fxImgs}>
                    <img className={stickerChosen[10]} src="/stickers/boom.png" alt="Boom Sticker" onClick={() => changeSticker("/stickers/boom.png", 10)}></img><br/>
                    <img className={stickerChosen[11]} src="/stickers/kablam.png" alt="Kablam Sticker" onClick={() => changeSticker("/stickers/kablam.png", 11)}></img><br/>
                    <img className={stickerChosen[12]} src="/stickers/oof.png" alt="Oof Sticker" onClick={() => changeSticker("/stickers/oof.png", 12)}></img><br/>
                    <img className={stickerChosen[13]} src="/stickers/poof.png" alt="Poof Sticker" onClick={() => changeSticker("/stickers/poof.png", 13)}></img><br/>
                    <img className={stickerChosen[14]} src="/stickers/wham.png" alt="Wham Sticker" onClick={() => changeSticker("/stickers/wham.png", 14)}></img><br/>
                    <img className={stickerChosen[15]} src="/stickers/zoom.png" alt="Zoom Sticker" onClick={() => changeSticker("/stickers/zoom.png", 15)}></img><br/>
                </div>
                <label id="bubbleLabel">Particles & Accents:</label><br/>
                <div id={styles.particleImgs}>
                    <img className={stickerChosen[16]} src="/stickers/angry.png" alt="Angry Sticker" onClick={() => changeSticker("/stickers/angry.png", 16)}></img><br/>
                    <img className={stickerChosen[17]} src="/stickers/heart.png" alt="Heart Sticker" onClick={() => changeSticker("/stickers/heart.png", 17)}></img><br/>
                    <img className={stickerChosen[18]} src="/stickers/shock.png" alt="Shock Sticker" onClick={() => changeSticker("/stickers/shock.png", 18)}></img><br/>
                    <img className={stickerChosen[19]} src="/stickers/silence.png" alt="Silence Sticker" onClick={() => changeSticker("/stickers/silence.png", 19)}></img><br/>
                    <img className={stickerChosen[20]} src="/stickers/sparkle.png" alt="Sparkle Sticker" onClick={() => changeSticker("/stickers/sparkle.png", 20)}></img><br/>
                    <img className={stickerChosen[21]} src="/stickers/sparkles.png" alt="Sparkles Sticker" onClick={() => changeSticker("/stickers/sparkles.png", 21)}></img><br/>
                </div>
                <label id="actorLabel">Actors:</label><br/>
                <div id={styles.actorImgs}>
                    <img className={stickerChosen[22] ? stickerChosen[22] : ""} src="/stickers/crawly.png" alt="Gnome Sticker" onClick={() => changeSticker("/stickers/crawly.png", 22)}></img><br/>
                </div>
            </div>
        )
    }
    else
    {
        return(null)
    }

}

export default StickerOptions

function setState<T>(): [any, any] {
    throw new Error("Function not implemented.");
}
