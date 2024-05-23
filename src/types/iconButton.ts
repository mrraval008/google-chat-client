export interface IconButton {
    id:number,
    type:string,
    icon: JSX.Element,
    background:string,
    disableIcon?:JSX.Element,
    isActive?:boolean
}