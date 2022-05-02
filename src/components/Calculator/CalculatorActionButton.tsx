import PropTypes from 'prop-types';
import { useAppDispatch } from '../../store/hooks';
import { addNewAction, CalculatorActions, CalculatorActionTypes } from './CalculatorSlice';
import styles from './Calculator.module.css';

export interface CalculatorButtonInterface {
    actionType: CalculatorActionTypes,
    handleOnClick?: () => void,
}

function CalculatorActionButton(props: CalculatorButtonInterface) {
    const dispatch = useAppDispatch();
    const { actionType, handleOnClick } = props;

    const defaultOnClick = () => {
        dispatch(addNewAction(actionType));
    };

    return (
        <button
            className={styles.calculatorBtn}
            onClick={handleOnClick || defaultOnClick}
        >
            {CalculatorActions[actionType]}
        </button>
    )
}

export default CalculatorActionButton;

CalculatorActionButton.propTypes = {
    actionType: PropTypes.string,
}
