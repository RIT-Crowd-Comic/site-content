// for the function type in any child components that need the function
type addToastFunction = (message : string, title: string, animation : boolean, delay : number, isError : boolean) => void;

interface ToastData {
    id: number;
    message: string;
    title: string;
    delay: number;
    animation: boolean;
    isError : boolean;
}
export type { addToastFunction, ToastData };
