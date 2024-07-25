import styles from './Panel.module.css'
import { SyntheticEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CreateHook, Hook } from '../interfaces';
import { createSVGPath } from '@/utils';
import Image from 'next/image';

// perhaps load this from a global color palette file
const FILL_COLOR = '#009BC6AA';
const HIGHLIGHT_COLOR = '#FFD172AA';
const NULL_HOOK = '#D91911AA'
const MIN_DRAWING_DIST = 3;

// reference https://www.pluralsight.com/resources/blog/guides/re-render-react-component-on-window-resize
// const debounce = (fn: Function, ms: number) => {
//     let timerId: NodeJS.Timeout | undefined;
//     return () => {
//       clearTimeout(timerId);
//       timerId = setTimeout(() => {
//         timerId = undefined;
//         fn();
//       }, ms);
//     };
//   }

/**
 * If any parameters for editing are missing, just display the existing panel.
 * Otherwise, display the panel and allow editing
 * @returns 
 */
const Panel = ({
    imgSrc,
    hooks,
    setHooks,
    addingHook = false,
    confirmHook,
    setConfirmHook,
    selectedHook,
    setSelectedHook,
    onHookClick,
    hidden: hideUntilHover,
}: {
    imgSrc: string,
    hooks: (Hook | CreateHook)[],
    setHooks?: (hooks: (Hook | CreateHook)[], panelIndex: number) => void
    addingHook?: boolean,
    confirmHook?: number,
    setConfirmHook?: (panelIndex: number | undefined) => void,
    selectedHook?: { panelIndex: number, hookIndex: number },
    setSelectedHook?: (hookInfo: { panelIndex: number, hookIndex: number } | undefined) => void,
    onHookClick?: (hook: Hook | CreateHook, hookIndex: number) => void,
    hidden?: boolean
    // active?: boolean
}) => {
    // for creating hooks
    const [vertices, setVertices] = useState<number[][]>([]);
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


        // clicking anywhere on the window will deselect hook
        if (typeof window !== 'undefined') window.onmousedown = (event) => {
            if (event.target === imgRef.current || event.target! instanceof HTMLButtonElement) {
                event.stopPropagation();
                return;
            }
            if (setSelectedHook) setSelectedHook(undefined);
        };
        // window.current?.addEventListener('resize', setScaleOnReload);
        // return () => window.current?.removeEventListener('resize', setScaleOnReload);
    }, []);

    // clear current hook data when {addingHook} becomes false
    useEffect(() => {
        if (!addingHook) setVertices([]);
    }, [addingHook]);

    // add a new hook
    useEffect(() => {
        if (confirmHook != undefined && setHooks && setConfirmHook) {
            console.log('current hook index', confirmHook);
            // prevent adding un-clickable hooks
            if (vertices.length >= 3) {
                setHooks(
                    [
                        ...hooks,
                        {
                            current_panel_index: confirmHook, //set to zero, will get reset before publish
                            points: vertices
                        }
                    ],
                    confirmHook
                );
            }
            setConfirmHook(undefined);
        }
    }, [confirmHook]);

    /**
     * Adds a vertex to the current hook SVG path. This should only be called when 
     * in edit mode.
     */
    const addVertex = (vertex: { x: number, y: number } | number = 0, vertexY: number = 0) => {
        if (scale == undefined) return;

        const x = typeof vertex === 'object' ? vertex.x : vertex ?? 0;
        const y = typeof vertex === 'object' ? vertex.y : vertexY ?? 0;
        const normalizedRoundedX = Math.round(x * scale.x * 10) / 10;
        const normalizedRoundedY = Math.round(y * scale.y * 10) / 10;

        // don't add a vertex if it's too close to the previous one 
        const lastVert = vertices[vertices.length - 1];
        if (lastVert &&
            Math.pow(normalizedRoundedX - lastVert[0], 2) +
            Math.pow(normalizedRoundedY - lastVert[1], 2) <
            Math.pow(MIN_DRAWING_DIST, 2)) return;


        // normalize coordinates from {x: [0, elementWidth], y: [0, elementHeight] } 
        // to {x: [0, 1200], y: [0, 800] } 
        const newVertices = [...vertices, [normalizedRoundedX, normalizedRoundedY]];
        setVertices(newVertices);
    }

    // const mouseDownHandler = (event?: SyntheticEvent<HTMLImageElement, MouseEvent>) => { }

    const mouseDragHandler = (event?: SyntheticEvent<HTMLImageElement, MouseEvent>) => {
        if (addingHook) {
            addVertex(event?.nativeEvent.offsetX, event?.nativeEvent.offsetY)
        }
    }

    const mouseMoveHandler = (event?: SyntheticEvent<HTMLImageElement, MouseEvent>) => {
        if (event?.nativeEvent.buttons === 1) return void mouseDragHandler(event);
        // console.log(event?.nativeEvent.offsetX);

    }

    // const touchToMouse =(event?:native.MouseEvent)=>{
    //    void mouseDragHandler(event);
    // }


    const touchMoveHandler = (event: SyntheticEvent<HTMLImageElement, TouchEvent>) => {

        let touch = event.nativeEvent.touches[0];

        let bcr = (touch.target as HTMLElement).getBoundingClientRect();
        let x = touch.clientX - bcr.x;
        let y = touch.clientY - bcr.y;

        if (addingHook) {
            addVertex(x, y)
        }

    }



    // const imgRect = imgRef.current?.getBoundingClientRect().left ?? 0;
    // const svgStyle = `
    //     left: ${imgRect}px
    // `;

    const editingStyle = addingHook ? styles.editing : '';
    const displayOnLoad = { display: scale == undefined ? 'none' : 'initial' };
    return (
        <div className={styles.branchEditor}>
            {/* <img
                src={imgSrc}
                className={`${styles.preview} ${addingHook ? styles.editing : ''}`}
                draggable='false'
                onMouseDown={mouseDownHandler}
                onMouseMove={mouseMoveHandler}
                ref={imgRef}
            /> */}
            <Image
                src={imgSrc}
                className={`${styles.preview} ${addingHook ? styles.editing : ''}`}
                draggable='false'
                onMouseDown={mouseMoveHandler}
                onMouseMove={mouseMoveHandler}
                onTouchStart={touchMoveHandler}
                onTouchMove={touchMoveHandler}
                ref={imgRef}
                alt="comic panel"
                width="500"
                height="500"
                unoptimized={true}
            />

            <svg className={`${styles.hookSvg} ${editingStyle}`} style={displayOnLoad}>
                <g transform={`scale(${1 / (scale?.x ?? 1)} ${1 / (scale?.y ?? 1)})`}>
                    {/* EXISTING HOOKS */}
                    {
                        hooks.map((hook, i) =>
                            <path
                                d={createSVGPath((hook as CreateHook).points ?? (hook as Hook).position.map(p => [p.x, p.y]) ?? '')}
                                fill={(selectedHook?.hookIndex ?? -1) === i ? HIGHLIGHT_COLOR : hook.next_panel_set_id === null ? NULL_HOOK : FILL_COLOR}
                                onClick={() => { if (onHookClick) onHookClick(hook, i) }}
                                className={`${styles.hookPath} ${hideUntilHover ? styles.hidden : ''}`}
                                key={i} />)}
                    {/* EDITOR HOOK */}
                    <path
                        d={createSVGPath(vertices)}
                        fill={FILL_COLOR}
                        stroke='black'
                        strokeWidth='3'
                        strokeDasharray='10 10'
                        strokeLinejoin='round'
                        strokeLinecap='round'
                        key='new-hook-path'
                    />
                </g>
            </svg>
        </div>
    )
}

export default Panel;