import { useAppSelector } from '../../store/hooks';
import styles from './Calculator.module.css';
import { selectInputValue, selectResult } from './CalculatorSlice';

function CalculatorScoreboard() {
    const inputValue = useAppSelector(selectInputValue);
    const result = useAppSelector(selectResult);

    return (
        <div className={styles.calculatorScoreboard}>
            <div className={styles.calculatorInputValue}>
                {inputValue}
            </div>
            <div className={styles.calculatorResult}>
                {result}
            </div>
        </div>
    )
}

export default CalculatorScoreboard;