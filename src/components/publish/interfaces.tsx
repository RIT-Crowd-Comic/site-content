import paper from 'paper'


export interface Panel {
    imgSrc: string,
    hooks: BranchHook[]
}

export interface PanelSet{
    current_panel_set_uuid: string,
    parent_branch_id: string,
    panels: Panel[]
}

export const emptyPanelSet = () => [
    {imgSrc: '', hooks: []}, 
    {imgSrc: '', hooks: []}, 
    {imgSrc: '', hooks: []}
];

export interface BranchHook{
    current_panel_id: number,
    points: number[][],
    next_panel_set_id?: string
}