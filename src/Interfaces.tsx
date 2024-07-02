export interface PanelSet{
    current_panel_set_uuid: string,
    parent_branch_uuid:string,
    image_paths: string[],
    branches: Branch[]
}
export interface Branch{
    panel: number,
    points: number[][],
    path?: paper.Path;
    child_panel_set_uuid: string
}