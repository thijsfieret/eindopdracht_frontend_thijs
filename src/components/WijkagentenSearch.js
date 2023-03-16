import React, {useState} from "react";
import styles from '../styles/WijkagentenSearch.module.css'

function WijkagentenSearch(props) {

    const [question1, setQuestion1] = useState('');
    const [question2, setQuestion2] = useState('');
    const [question3, setQuestion3] = useState('5.0');
    const radiusOptions = ['0.5', '2.0', '5.0', '10.0', '25.0'];

    function handleSubmit(event) {
        event.preventDefault();
        props.handleSearch(question1, question2, question3);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label className={styles.Invoer}>
                Latitude:
                <input
                    type="text"
                    placeholder={"53.15 Bijvoorbeeld"}
                    value={question1}
                    onChange={(event) => setQuestion1(event.target.value)}
                />
            </label>
            <label className={styles.Invoer}>
                Longitude:
                <input
                    type="text"
                    placeholder={"6.75 Bijvoorbeeld"}
                    value={question2}
                    onChange={(event) => setQuestion2(event.target.value)}
                />
            </label>
            <label className={styles.Invoer}>
                Radius:
                <select
                    value={question3}
                    onChange={(event) => setQuestion3(event.target.value)}
                >
                    {radiusOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>
            <button type="submit">Zoek</button>
        </form>
    )
}

export default WijkagentenSearch