import { FC, useContext } from "react"
import { peerSate } from "../../context/peerReducer";
import { RoomContext } from "../../context/RoomContext";
import styles from './People.module.css';
export const People: FC<{}> = function ({}) {
    const { peers } = useContext(RoomContext)

    return (
        <>
            <div className={styles.people_container}>
                {Object.values(peers as peerSate).map((peer) => {
                    return <div>{peer.name}</div>
                })}
            </div>

        </>

    )
}