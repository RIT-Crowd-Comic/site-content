import paper from 'paper'


export interface Panel {
    id: number,
    index: number,
    imgSrc: string,
    previous_hook?: Hook | undefined,
    hooks: Hook[]
}

export interface PanelSet{
    id: number,
    author_id: string,
    panels: Panel[],
    previous_hook?: Hook | undefined;
}

export const emptyPanelSet = () => [
    {imgSrc: '', hooks: [], id: -1, index: 0 }, 
    {imgSrc: '', hooks: [], id: -1, index: 1 }, 
    {imgSrc: '', hooks: [], id: -1, index: 2 }
];

export interface Hook{
    id: number,
    current_panel_index: number,
    points: number[][],
    next_panel_set_id?: number
}