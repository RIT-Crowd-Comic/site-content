const createSVGPath = (points: number[][]) => points.map((point, i) => (i === 0 ? 'M' : 'L') + `${point[0]} ${point[1]}`).join(' ')


export {
    createSVGPath
}