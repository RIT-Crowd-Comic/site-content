export interface PanelSet{
    current_panel_set_uuid: string,
    parent_branch_uuid:string,
    image_paths: string[],
    branches: Branch[]
}
export interface Branch{
    panel: number,
    x: number,
    y: number,
    child_branch_uuid: string
}