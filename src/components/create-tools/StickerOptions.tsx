import { useRef, useState } from 'react';
import styles from '@/styles/create.module.css';

interface Props
{
    enabled: boolean;               // Should the HTML of this component be displayed on the page currently?
    setSticker: Function;        // Method for setting the url of the sticker tool
}

// *** Sticker Options is used in order to changed the different values associated with the sticker tool in CreateToolsCanvas ***
const StickerOptions = ({ enabled, setSticker } : Props) => {
    const STICKER_COUNT = 51; // Must be increased when new stickers are added
    const [stickerChosen, setChosen] = useState<string[]>([]);
    const [run, setRun] = useState(false);

    /*
    */
    if (!run) {
        for (let i = 0; i < STICKER_COUNT; i++) {
            stickerChosen.push('not'); // fills chosen array
        }
        setChosen(stickerChosen);
        setRun(true);
    }

    const changeSticker = (target:string, index:number) => {
        setSticker(target);



        for (let i = 0; i < stickerChosen.length; i++) {
            stickerChosen[i] = styles.not;
        }

        stickerChosen[index] = styles.chosen;
        setChosen(stickerChosen);
    };

    // If the component is set to be enabled, return HTML, otherwise, return nothing
    if (enabled) {
        return (
            <div id={styles.stickerTools} className={styles.toolStyles}>
                <h3>Sticker Tools</h3>
                <label id="bubbleLabel">Bubbles:</label><br />
                <div id={styles.bubbleImgs}>

                    <img
                        className={stickerChosen[0]}
                        src="/stickers/speechBubbleL.png"
                        alt="Speech Bubble Left Sticker"
                        onClick={() => changeSticker('/stickers/speechBubbleL.png', 0)}
                    /><br />
                    <img
                        className={stickerChosen[1]}
                        src="/stickers/speechBubbleR.png"
                        alt="Speech Bubble Right Sticker"
                        onClick={() => changeSticker('/stickers/speechBubbleR.png', 1)}
                    /><br />
                    <img
                        className={stickerChosen[2]}
                        src="/stickers/thoughtBubbleL.png"
                        alt="Thought Bubble Left Sticker"
                        onClick={() => changeSticker('/stickers/thoughtBubbleL.png', 2)}
                    /><br />
                    <img
                        className={stickerChosen[3]}
                        src="/stickers/thoughtBubbleR.png"
                        alt="Thought Bubble Right Sticker"
                        onClick={() => changeSticker('/stickers/thoughtBubbleR.png', 3)}
                    /><br />
                    <img
                        className={stickerChosen[4]}
                        src="/stickers/exclamationBubble.png"
                        alt="Exclamation Bubble Sticker"
                        onClick={() => changeSticker('/stickers/exclamationBubble.png', 4)}
                    /><br />
                    <img
                        className={stickerChosen[5]}
                        src="/stickers/detachedBubble.png"
                        alt="Detached Bubble Sticker"
                        onClick={() => changeSticker('/stickers/detachedBubble.png', 5)}
                    /><br />
                    <img
                        className={stickerChosen[6]}
                        src="/stickers/woozyBubbleL.png"
                        alt="Woozy Bubble Left Sticker"
                        onClick={() => changeSticker('/stickers/woozyBubbleL.png', 6)}
                    /><br />
                    <img
                        className={stickerChosen[7]}
                        src="/stickers/woozyBubbleR.png"
                        alt="Woozy Bubble Right Sticker"
                        onClick={() => changeSticker('/stickers/woozyBubbleR.png', 7)}
                    /><br />
                    <img
                        className={stickerChosen[8]}
                        src="/stickers/dashBubbleL.png"
                        alt="Dash Bubble Left Sticker"
                        onClick={() => changeSticker('/stickers/dashBubbleL.png', 8)}
                    /><br />
                    <img
                        className={stickerChosen[9]}
                        src="/stickers/dashBubbleR.png"
                        alt="Dash Bubble Right Sticker"
                        onClick={() => changeSticker('/stickers/dashBubbleR.png', 9)}
                    /><br />
                </div>
                <label id="fxLabel">Word Effects:</label><br />
                <div id={styles.fxImgs}>
                    <img
                        className={stickerChosen[10]}
                        src="/stickers/boom.png"
                        alt="Boom Sticker"
                        onClick={() => changeSticker('/stickers/boom.png', 10)}
                    /><br />
                    <img
                        className={stickerChosen[11]}
                        src="/stickers/kablam.png"
                        alt="Kablam Sticker"
                        onClick={() => changeSticker('/stickers/kablam.png', 11)}
                    /><br />
                    <img
                        className={stickerChosen[12]}
                        src="/stickers/oof.png"
                        alt="Oof Sticker"
                        onClick={() => changeSticker('/stickers/oof.png', 12)}
                    /><br />
                    <img
                        className={stickerChosen[13]}
                        src="/stickers/poof.png"
                        alt="Poof Sticker"
                        onClick={() => changeSticker('/stickers/poof.png', 13)}
                    /><br />
                    <img
                        className={stickerChosen[14]}
                        src="/stickers/wham.png"
                        alt="Wham Sticker"
                        onClick={() => changeSticker('/stickers/wham.png', 14)}
                    /><br />
                    <img
                        className={stickerChosen[15]}
                        src="/stickers/zoom.png"
                        alt="Zoom Sticker"
                        onClick={() => changeSticker('/stickers/zoom.png', 15)}
                    /><br />
                </div>
                <label id="bubbleLabel">Particles & Accents:</label><br />
                <div id={styles.particleImgs}>
                    <img
                        className={stickerChosen[16]}
                        src="/stickers/angry.png"
                        alt="Angry Sticker"
                        onClick={() => changeSticker('/stickers/angry.png', 16)}
                    /><br />
                    <img
                        className={stickerChosen[17]}
                        src="/stickers/heart.png"
                        alt="Heart Sticker"
                        onClick={() => changeSticker('/stickers/heart.png', 17)}
                    /><br />
                    <img
                        className={stickerChosen[18]}
                        src="/stickers/shock.png"
                        alt="Shock Sticker"
                        onClick={() => changeSticker('/stickers/shock.png', 18)}
                    /><br />
                    <img
                        className={stickerChosen[19]}
                        src="/stickers/silence.png"
                        alt="Silence Sticker"
                        onClick={() => changeSticker('/stickers/silence.png', 19)}
                    /><br />
                    <img
                        className={stickerChosen[20]}
                        src="/stickers/sparkle.png"
                        alt="Sparkle Sticker"
                        onClick={() => changeSticker('/stickers/sparkle.png', 20)}
                    /><br />
                    <img
                        className={stickerChosen[21]}
                        src="/stickers/sparkles.png"
                        alt="Sparkles Sticker"
                        onClick={() => changeSticker('/stickers/sparkles.png', 21)}
                    /><br />
                </div>
                <label id="actorLabel">Actors:</label><br />
                <div id={styles.actorImgs}>
                    <img
                        className={stickerChosen[22]}
                        src="/stickers/crawly.png"
                        alt="Gnome Sticker"
                        onClick={() => changeSticker('/stickers/crawly.png', 22)}
                    /><br />
                    <img
                        className={stickerChosen[23]}
                        src="/stickers/monkeFace.png"
                        alt="Monkey Face Sticker"
                        onClick={() => changeSticker('/stickers/monkeFace.png', 23)}
                    /><br />
                    <img
                        className={stickerChosen[24]}
                        src="/stickers/monkeR.png"
                        alt="Monkey Face Right Sticker"
                        onClick={() => changeSticker('/stickers/monkeR.png', 24)}
                    /><br />
                    <img
                        className={stickerChosen[25]}
                        src="/stickers/monkeL.png"
                        alt="Monkey Face Left Sticker"
                        onClick={() => changeSticker('/stickers/monkeL.png', 25)}
                    /><br />
                    <img
                        className={stickerChosen[26]}
                        src="/stickers/monkeMadR.png"
                        alt="Monkey Mad Right Sticker"
                        onClick={() => changeSticker('/stickers/monkeMadR.png', 26)}
                    /><br />
                    <img
                        className={stickerChosen[27]}
                        src="/stickers/monkeMadL.png"
                        alt="Monkey Mad Left Sticker"
                        onClick={() => changeSticker('/stickers/monkeMadL.png', 27)}
                    /><br />
                    <img
                        className={stickerChosen[28]}
                        src="/stickers/monkePoutR.png"
                        alt="Monkey Pout Right Sticker"
                        onClick={() => changeSticker('/stickers/monkePoutR.png', 28)}
                    /><br />
                    <img
                        className={stickerChosen[29]}
                        src="/stickers/monkePoutL.png"
                        alt="Monkey Pout Left Sticker"
                        onClick={() => changeSticker('/stickers/monkePoutL.png', 29)}
                    /><br />
                    <img
                        className={stickerChosen[30]}
                        src="/stickers/monkeWaveR.png"
                        alt="Monkey Wave Right Sticker"
                        onClick={() => changeSticker('/stickers/monkeWaveR.png', 30)}
                    /><br />
                    <img
                        className={stickerChosen[31]}
                        src="/stickers/monkeWaveL.png"
                        alt="Monkey Wave Left Sticker"
                        onClick={() => changeSticker('/stickers/monkeWaveL.png', 31)}
                    /><br />
                    <img
                        className={stickerChosen[32]}
                        src="/stickers/frgR.png"
                        alt="Frog Right Sticker"
                        onClick={() => changeSticker('/stickers/frgR.png', 32)}
                    /><br />
                    <img
                        className={stickerChosen[33]}
                        src="/stickers/frgL.png"
                        alt="Frog Left Sticker"
                        onClick={() => changeSticker('/stickers/frgL.png', 33)}
                    /><br />
                    <img
                        className={stickerChosen[34]}
                        src="/stickers/frgCryR.png"
                        alt="Frog Cry Right Sticker"
                        onClick={() => changeSticker('/stickers/frgCryR.png', 34)}
                    /><br />
                    <img
                        className={stickerChosen[35]}
                        src="/stickers/frgCryR.png"
                        alt="Frog Cry Left Sticker"
                        onClick={() => changeSticker('/stickers/frgCryR.png', 35)}
                    /><br />
                    <img
                        className={stickerChosen[36]}
                        src="/stickers/frgPartyR.png"
                        alt="Frog Party Right Sticker"
                        onClick={() => changeSticker('/stickers/frgPartyR.png', 36)}
                    /><br />
                    <img
                        className={stickerChosen[37]}
                        src="/stickers/frgPartyL.png"
                        alt="Frog Party Left Sticker"
                        onClick={() => changeSticker('/stickers/frgPartyL.png', 37)}
                    /><br />
                    <img
                        className={stickerChosen[38]}
                        src="/stickers/frgRageR.png"
                        alt="Frog Rage Right Sticker"
                        onClick={() => changeSticker('/stickers/frgRageR.png', 38)}
                    /><br />
                    <img
                        className={stickerChosen[39]}
                        src="/stickers/frgRageL.png"
                        alt="Frog Rage Left Sticker"
                        onClick={() => changeSticker('/stickers/frgRageL.png', 39)}
                    /><br />
                    <img
                        className={stickerChosen[40]}
                        src="/stickers/frgWorryR.png"
                        alt="Frog Worry Right Sticker"
                        onClick={() => changeSticker('/stickers/frgWorryR.png', 40)}
                    /><br />
                    <img
                        className={stickerChosen[41]}
                        src="/stickers/frgWorryL.png"
                        alt="Frog Worry Left Sticker"
                        onClick={() => changeSticker('/stickers/frgWorryL.png', 41)}
                    /><br />
                    <img
                        className={stickerChosen[42]}
                        src="/stickers/frgFace.png"
                        alt="Frog Face Sticker"
                        onClick={() => changeSticker('/stickers/frgFace.png', 42)}
                    /><br />
                    <img
                        className={stickerChosen[43]}
                        src="/stickers/g1.png"
                        alt="Gerald 1 Sticker"
                        onClick={() => changeSticker('/stickers/g1.png', 43)}
                    /><br />
                    <img
                        className={stickerChosen[44]}
                        src="/stickers/g2.png"
                        alt="Gerald 2 Sticker"
                        onClick={() => changeSticker('/stickers/g2.png', 44)}
                    /><br />
                    <img
                        className={stickerChosen[45]}
                        src="/stickers/g3.png"
                        alt="Gerald 3 Sticker"
                        onClick={() => changeSticker('/stickers/g3.png', 45)}
                    /><br />
                    <img
                        className={stickerChosen[46]}
                        src="/stickers/g4.png"
                        alt="Gerald 4 Sticker"
                        onClick={() => changeSticker('/stickers/g4.png', 46)}
                    /><br />
                    <img
                        className={stickerChosen[47]}
                        src="/stickers/g5.png"
                        alt="Gerald 5 Sticker"
                        onClick={() => changeSticker('/stickers/g5.png', 47)}
                    /><br />
                    <img
                        className={stickerChosen[48]}
                        src="/stickers/g6.png"
                        alt="Gerald 6 Sticker"
                        onClick={() => changeSticker('/stickers/g6.png', 48)}
                    /><br />
                    <img
                        className={stickerChosen[49]}
                        src="/stickers/g7.png"
                        alt="Gerald 7 Sticker"
                        onClick={() => changeSticker('/stickers/g7.png', 49)}
                    /><br />
                    <img
                        className={stickerChosen[50]}
                        src="/stickers/g8.png"
                        alt="Gerald 8 Sticker"
                        onClick={() => changeSticker('/stickers/g8.png', 50)}
                    /><br />
                    <img
                        className={stickerChosen[51]}
                        src="/stickers/sten.png"
                        alt="Sten Sticker"
                        onClick={() => changeSticker('/stickers/sten.png', 51)}
                    /><br />
                </div>
            </div>
        );
    }
    else {
        return (null);
    }

};

export default StickerOptions;

function setState<T>(): [any, any] {
    throw new Error('Function not implemented.');
}
