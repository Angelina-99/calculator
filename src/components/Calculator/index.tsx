import styles from './Calculator.module.css';
import CalculatorScoreboard from './CalculatorScoreboard';
import CalculatorActions from './CalculatorActions';

function Index() {
    return (
        <div className={styles.calculatorContainer}>
            <div className={styles.calculatorContent}>
                <CalculatorScoreboard />
                <CalculatorActions />
            </div>
        </div>
    )
}

export default Index;