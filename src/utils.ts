const createSVGPath = (points: number[][]) => points.map((point, i) => (i === 0 ? 'M' : 'L') + `${point[0]} ${point[1]}`).join(' ')

/**
 * Calculate the area of a polygon
 * @param points array of points [[x1, y1], [x2, y2]...]
 */

// NOTE: THIS IS SIGNED AREA. IF YOU WANT NORMAL AREA, WRAP THE CONTENTS OF THIS FUNCTION IN Math.abs()
const calculateArea = (points: number[][]) =>
    Math.abs(points.reduce(
        (area, current, i) =>
            area +
            (i < points.length - 1 ? // prevent array out of bounds
                (current[1] + points[i + 1][1]) * (points[i + 1][0] - current[0]) / 2 :
                (current[1] + points[0][1]) * (points[0][0] - current[0]) / 2) // loop back to from last to first point
        , 0));


/**
 * Toggles a specified class for all children based on the predicate return (true: enable, false: disable)
 * @param selector 
 * @param className 
 * @param predicate true: enable class, false: disable class
 */
const toggleClassForAllElements = (selector: string, className: string, predicate: (elm: Element, i: number) => boolean) => {
    const allPanels = document.querySelectorAll(selector);
    allPanels.forEach((panelContainer, i) => {
        panelContainer.classList.remove(className);
        if (predicate(panelContainer, i)) panelContainer.classList.add(className);
    });
}


export {
    createSVGPath,
    toggleClassForAllElements
}