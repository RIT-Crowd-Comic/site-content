
interface CreatePanel {
    id: number,
    index: number,
    imgSrc: string,
    previous_hook_id?: number | undefined,
    hooks: CreateHook[]
}

interface CreatePanelSet{
    id: number,
    author_id: string,
    panels: CreatePanel[],
    previous_hook_id?: number | undefined;
}

const emptyPanelSet = () => [
    {
        imgSrc: '', hooks: [], id: -1, index: 0
    },
    {
        imgSrc: '', hooks: [], id: -1, index: 1
    },
    {
        imgSrc: '', hooks: [], id: -1, index: 2
    }
];

interface CreateHook{
    current_panel_index: number,
    points: number[][],
    next_panel_set_id?: number
}

interface Panel {
    id: number,
    index: number,
    imgSrc: string,
    previous_hook?: Hook | undefined,
    hooks: Hook[],
}

interface PanelSet{
    id: number,
    author_id: string,
    panels: Panel[],
    hook?: Hook | undefined;
}

interface Hook{
    id: number,
    position: {x: number, y: number}[],
    current_panel_id: number,
    next_panel_set_id?: number
}

interface User {
    id: string
    email: string
    display_name: string
    profile_picture: string
}


export type {
    CreatePanelSet,
    CreatePanel,
    CreateHook,
    PanelSet,
    Panel,
    Hook,
    User
};

export { emptyPanelSet, };
