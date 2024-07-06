import styles from './BranchEditor.module.css'
import { SyntheticEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BranchHook } from './interfaces';
import { createSVGPath } from '@/utils';

// perhaps load this from a global color palette file
const FILL_COLOR = '#009BC6AA';
const HIGHLIGHT_COLOR = '#FFD172AA';

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
const BranchEditor = ({
    imgSrc,
    panelIndex,
    hooks,
    setHooks,
    addingHook = false,
    confirmHook,
    setConfirmHook,
    selectedHook,
    setSelectedHook,
    onHookClick
}: {
    imgSrc: string,
    panelIndex: number,
    hooks: BranchHook[],
    setHooks?: (hooks: BranchHook[], panelIndex: number) => void
    addingHook?: boolean,
    confirmHook?: number,
    setConfirmHook?: (panelIndex: number | undefined) => void,
    selectedHook?: { panelIndex: number, hookIndex: number },
    setSelectedHook: ({ }: { panelIndex: number, hookIndex: number } | undefined) => void,
    onHookClick?: (hook: BranchHook, hookIndex: number) => void
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
            setSelectedHook(undefined);
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
        console.log(confirmHook);
        if (confirmHook != undefined && setHooks && setConfirmHook) {

            // prevent adding un-clickable hooks
            if (vertices.length >= 3) {
                setHooks(
                    [
                        ...hooks,
                        {
                            current_panel_id: 123412341234,
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

        // normalize coordinates from {x: [0, elementWidth], y: [0, elementHeight] } 
        // to {x: [0, 1200], y: [0, 800] } 
        const newVertices = [...vertices, [x * scale.x, y * scale.y]];
        setVertices(newVertices);
    }

    const mouseDownHandler = (event?: SyntheticEvent<HTMLImageElement, MouseEvent>) => {
        if (addingHook) {
            addVertex(event?.nativeEvent.offsetX, event?.nativeEvent.offsetY)
        }
        else {
            // selectHook({panelIndex, hookIndex});
        }
    }

    const mouseDragHandler = (event?: SyntheticEvent<HTMLImageElement, MouseEvent>) => {
        if (addingHook) {
            addVertex(event?.nativeEvent.offsetX, event?.nativeEvent.offsetY)
        }
    }

    const mouseMoveHandler = (event?: SyntheticEvent<HTMLImageElement, MouseEvent>) => {
        if (event?.nativeEvent.buttons === 1) return void mouseDragHandler(event);
    }

    // const imgRect = imgRef.current?.getBoundingClientRect().left ?? 0;
    // const svgStyle = `
    //     left: ${imgRect}px
    // `;

    return (
        <div className={styles.branchEditor}>
            <img
                src={imgSrc}
                className={`${styles.preview} ${addingHook ? styles.editing : ''}`}
                draggable='false'
                onMouseDown={mouseDownHandler}
                onMouseMove={mouseMoveHandler}
                ref={imgRef}
            />
            <svg className={`${styles.hookSvg} ${addingHook ? styles.editing : ''}`}>
                <g transform={`scale(${1 / (scale?.x ?? 1)} ${1 / (scale?.y ?? 1)})`}>
                    {/* EXISTING HOOKS */}
                    {hooks.map((hook, i) =>
                        <path
                            d={createSVGPath(hook.points)}
                            fill={(selectedHook?.hookIndex ?? -1) === i ? HIGHLIGHT_COLOR : FILL_COLOR}
                            onClick={() => { if (onHookClick) onHookClick(hook, i) }}
                            className={styles.hookPath}
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

export default BranchEditor;