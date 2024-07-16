import paper from 'paper'


export interface Panel {
    imgSrc: string,
    hooks: BranchHook[]
}

export interface PanelSet{
    parent_branch_id: number | undefined,
    panels: Panel[]
}

export const emptyPanelSet = () => [
    {imgSrc: '', hooks: []}, 
    {imgSrc: '', hooks: []}, 
    {imgSrc: '', hooks: []}
];

export interface BranchHook{
    current_panel_index: number,
    points: number[][],
    next_panel_set_id?: string
}