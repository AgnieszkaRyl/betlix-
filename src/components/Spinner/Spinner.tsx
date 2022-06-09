import spinner from "./../../assets/spin.gif"
import styles from "./Spinner.module.scss";

const Spinner=()=>{
    return (
        <div className={styles.spinnerContainer}><img src={spinner}/></div>
    )
}
export default Spinner;