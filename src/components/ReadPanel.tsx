import styles from './publish/Panel.module.css';
import {
    useLayoutEffect, useRef, useState
} from 'react';
import { CreateHook, Hook, PanelSet } from './interfaces';
import {
    createSVGPath
} from '@/utils';
import Image from 'next/image';
import { OverlayTrigger, Popover } from 'react-bootstrap';

// perhaps load this from a global color palette file
const FILL_COLOR = '#009BC6AA';
const NULL_HOOK = '#D91911AA';
const FORBIDDEN_HOOK = '#939393AA';

/**
 * If any parameters for editing are missing, just display the existing panel.
 * Otherwise, display the panel and allow editing
 * @returns 
 */
const ReadPanel = ({
    imgSrc,
    hooks,
    onHookClick,
    hidden: hideUntilHover,
    panel_set,
    userId
}: {
    imgSrc: string,
    hooks: (Hook | CreateHook)[],
    onHookClick: (hook: Hook | CreateHook, hookIndex: number) => void,
    hidden: boolean,
    panel_set: PanelSet | undefined,
    userId: string
}) => {

    const imgRef = useRef<HTMLImageElement | null>(null);
    const [scale, setScale] = useState<{ x: number, y: number }>();
    useLayoutEffect(() => {

        // set svg scale when the panel img resizes
        const setScaleOnReload = () => setScale({
            x: 1200 / (imgRef.current?.clientWidth ?? 1200),
            y: 800 / (imgRef.current?.clientHeight ?? 800),
        });

        // make sure it's called at least once
        setScaleOnReload();

        const ro = new ResizeObserver(setScaleOnReload);
        if (imgRef.current) ro.observe(imgRef.current);

    }, []);

    const displayOnLoad = { display: scale == undefined ? 'none' : 'initial' };
    return (
        <div className={styles.branchEditor}>
            <Image
                className={`${styles.preview}`}
                src={imgSrc}
                draggable="false"
                ref={imgRef}
                alt="comic panel"
                width="500"
                height="500"
                unoptimized={true}
            />

            <svg className={`${styles.hookSvg}`} style={displayOnLoad}>
                <g transform={`scale(${1 / (scale?.x ?? 1)} ${1 / (scale?.y ?? 1)})`}>
                    {
                        hooks.map((hook, i) => (
                            <OverlayTrigger trigger={["focus", "hover"]} placement="bottom" overlay={  (
                                <Popover id="popover">
                                    <Popover.Body>
                                    <strong>{hook.next_panel_set_id === null && panel_set?.author_id === userId ? 'You cannot add to a comic panel you created!' : hook.next_panel_set_id == null ? 'Create a new comic panel.' : 'Continue the story.'}</strong>
                                    </Popover.Body>
                                </Popover>
                            )}>
                                <path
                                    d={createSVGPath((hook as CreateHook).points ?? (hook as Hook).position.map(p => [p.x, p.y]) ?? '')}
                                    fill={hook.next_panel_set_id === null && panel_set?.author_id === userId ? FORBIDDEN_HOOK : hook.next_panel_set_id !== null ? FILL_COLOR : NULL_HOOK}
                                    onClick={() => { if (onHookClick) onHookClick(hook, i); }}
                                    className={`${styles.hookPath} ${hideUntilHover ? styles.hidden : ''} ${styles[hook.next_panel_set_id === null && panel_set?.author_id === userId ? 'hookBlocked' : hook.next_panel_set_id == null ? 'hookEmpty' : 'hookTaken']}`}
                                    key={i}
                                />
                            </OverlayTrigger>

                        ))
                    }
                </g>
            </svg>
        </div>
    );
};

export default ReadPanel;