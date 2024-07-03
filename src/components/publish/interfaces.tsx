import paper from 'paper'

export interface PanelSet{
    current_panel_set_uuid: string,
    parent_branch_uuid:string,
    image_paths: string[],
    hooks: BranchHook[]
}
export interface BranchHook{
    panel_id: number,
    points: number[][],
    path?: paper.Path;
    next_panel_set_id?: string
}