import PropTypes from 'prop-types';
import { useAppDispatch } from '../../store/hooks';
import { addInputValue } from './CalculatorSlice';
import styles from './Calculator.module.css';

export interface CalculatorButtonInterface {
    btnCaption: string,
    handleOnClick?: () => void,
}

function CalculatorButton(props: CalculatorButtonInterface) {
    const dispatch = useAppDispatch();
    const { btnCaption, handleOnClick } = props;

    const defaultOnClick = () => {
        dispatch(addInputValue(btnCaption));
    };

    return (
        <button
            className={styles.calculatorBtn}
            onClick={handleOnClick || defaultOnClick}
        >
            {btnCaption}
        </button>
    )
}

export default CalculatorButton;

CalculatorButton.defaultProps = {
    btnCaption: '',
}

CalculatorButton.propTypes = {
    btnCaption: PropTypes.string,
    handleOnlick: PropTypes.func,
}
