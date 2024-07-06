const createSVGPath = (points: number[][]) => points.map((point, i) => (i === 0 ? 'M' : 'L') + `${point[0]} ${point[1]}`).join(' ')

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