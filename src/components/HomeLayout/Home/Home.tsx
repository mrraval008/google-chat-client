import { FC, useContext } from "react"
import { LendingPage } from "../../lendingpage/LendingPage";
import styles from './Home.module.css';
import {ws} from '../../../ws/ws';

const Home:FC<{}> = function(){

    const createRoom = (userName:string) => {
        ws.emit("create-room",userName)
    }
    const submitUserForm = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formElements = form.elements as typeof form.elements & {
            userName: { value: string }
        }
        createRoom(formElements.userName.value)
    }
    return (
        <div className={styles.container}>
            <LendingPage submitUserForm={submitUserForm}></LendingPage>
        </div>
    )
}

export default Home;