import { FC } from "react";
import styles from './Button.module.css';
const ButtonIcon:FC<{onClick:()=>void,children:JSX.Element,background:string}> = function({onClick,children,background}){
    return (
        <button className={styles.icon} style={{background:background}} onClick={onClick}>
                {children}
        </button>
    )
}
export default ButtonIcon;