import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/create.module.css';
import stickersMap from '../../../data/stickers-map.json';

interface Props {
    enabled: boolean;               // Should the HTML of this component be displayed on the page currently?
    setSticker: Function;        // Method for setting the url of the sticker tool
}

interface Sticker {
    src: string,
    alt: string
}

type StickerProps = 'bubbles' | 'word-effects' | 'particles-accents' | 'actors';

const stickerChosenTemplate = () => {
    const stickerChosenTemplate: { [key: string]: string[] } = {};

    /* 
    Fill out stickerChosen with 
    {
        "bubbles": ["not", "not", ...],
        "word-effects": ...,
        ...
    }
     */
    Object.entries(stickersMap).forEach(sticker => {
        stickerChosenTemplate[sticker[0]] = sticker[1].map(() => 'not');
    });
    return stickerChosenTemplate;
};

// *** Sticker Options is used in order to changed the different values associated with the sticker tool in CreateToolsCanvas ***
const StickerOptions = ({ enabled, setSticker }: Props) => {

    // run, setRun() are no longer needed since the stickerChosen object is initialized inline

    const [stickerChosen, setChosen] = useState<{ [key: string]: string[] }>(stickerChosenTemplate());


    const changeSticker = (target: string, stickerCategory: string, index: number) => {
        setSticker(target);

        const newStickerChosen = stickerChosenTemplate();
        newStickerChosen[stickerCategory][index] = styles.chosen;

        setChosen(newStickerChosen);
    };

    const createStickerImages = (stickerCategory: StickerProps) => {
        if (stickerChosen == undefined || Object.keys(stickerChosen).length === 0) return undefined;
        return stickersMap[stickerCategory].map((sticker, i) => (
            <>
                <img
                    className={stickerChosen[stickerCategory][i]}
                    src={sticker.src}
                    alt={sticker.alt}
                    onClick={() => changeSticker(sticker.src, stickerCategory, i)}
                />
                <br />
            </>
        ));
    };

    // If the component is set to be enabled, return HTML, otherwise, return nothing
    if (enabled) {
        return (
            <div id={styles.stickerTools} className={styles.toolStyles}>
                <h3>Sticker Tools</h3>
                <label id="bubbleLabel">Bubbles:</label><br />
                <div id={styles.bubbleImgs}>
                    {createStickerImages('bubbles')}
                </div>
                <label id="fxLabel">Word Effects:</label><br />
                <div id={styles.fxImgs}>
                    {createStickerImages('word-effects')}
                </div>
                <label id="bubbleLabel">Particles & Accents:</label><br />
                <div id={styles.particleImgs}>
                    {createStickerImages('particles-accents')}
                </div>
                <label id="actorLabel">Actors:</label><br />
                <div id={styles.actorImgs}>
                    {createStickerImages('actors')}
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
