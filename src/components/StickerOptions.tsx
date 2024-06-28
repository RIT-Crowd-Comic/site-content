import { useRef } from "react";

interface Props
{
    enabled: Boolean;               // Should the HTML of this component be displayed on the page currently?
    changeSticker: Function;        // Method for setting the url of the sticker tool
}

// *** Sticker Options is used in order to changed the different values associated with the sticker tool in CreateToolsCanvas ***
const StickerOptions = ({enabled, changeSticker} : Props) =>
{
    // If the component is set to be enabled, return HTML, otherwise, return nothing
    if(enabled)
    {
        return(
            <div id="stickerTools">
                <h3>Sticker Tools</h3>
                <div id="bubbleImgs">
                    <label id="bubbleLabel">Bubbles:</label><br/>
                    <img src="/stickers/speechBubble.png" alt="Speech Bubble Sticker" onClick={() => changeSticker("/stickers/speechBubble.png")}></img><br/>
                    <img src="/stickers/thoughtBubble.png" alt="Thought Bubble Sticker" onClick={() => changeSticker("/stickers/thoughtBubble.png")}></img><br/>
                </div>
                <div id="actorImgs">
                    <label id="actorLabel">Actors:</label><br/>
                    <img src="/stickers/monkey.png" alt="Monkey Sticker" onClick={() => changeSticker("/stickers/monkey.png")}></img><br/>
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