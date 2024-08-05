//for the function type in any child components that need the function
type addToastFunction =  (message : string, title: string,  animation : boolean, delay : number) => void;

export type {addToastFunction}