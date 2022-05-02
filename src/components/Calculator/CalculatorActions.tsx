import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Grid } from '@material-ui/core';
import styles from './Calculator.module.css';
import CalculatorButton from './CalculatorButton';
import CalculatorActionButton from './CalculatorActionButton';
import { selectKey } from '../KeyPressListener/KeyPressListenerSlice';
import {
    clearInputValue,
    addInputValue,
    CalculatorActionTypes,
    calculate,
    addNewAction,
    removeLast,
} from './CalculatorSlice';

function CalculatorActions() {
    const dispatch = useAppDispatch();
    const keyPressed = useAppSelector(selectKey);

    const handleOnClear = () => {
        dispatch(clearInputValue());
    };

    const handleOnCalculate = () => {
        dispatch(calculate());
    }

    useEffect(() => {
        const reg = /^[0-9]$/;
        const key = keyPressed.key;
        if (reg.test(key) || key === '(' || key === ')') {
            dispatch(addInputValue(key));
            return;
        }
        if (key === 'Backspace') {
            dispatch(removeLast());
        }
        if (key === 'Enter' || key === '=') {
            handleOnCalculate();
            return;
        }
        switch (key) {
            case '+': {
                dispatch(addNewAction(CalculatorActionTypes.addition));
                break;
            }
            case '-': {
                dispatch(addNewAction(CalculatorActionTypes.subtraction));
                break;
            }
            case '*': {
                dispatch(addNewAction(CalculatorActionTypes.multiplication));
                break;
            }
            case '/': {
                dispatch(addNewAction(CalculatorActionTypes.division));
                break;
            }
            case '%': {
                dispatch(addNewAction(CalculatorActionTypes.pircent));
                break;
            }
            default: {
                break;
            }
        }
    }, [keyPressed]);

    return (
        <Grid
            container
            direction='column'
            spacing={1}
            className={styles.calculatorActions}
        >
            <Grid item>
                <Grid container spacing={1} justifyContent='space-between'>
                    <Grid item>
                        <CalculatorButton
                            btnCaption='C'
                            handleOnClick={handleOnClear}
                        />
                    </Grid>
                    <Grid item>
                        <CalculatorActionButton actionType={CalculatorActionTypes.sqrt} />
                    </Grid>
                    <Grid item>
                        <CalculatorActionButton actionType={CalculatorActionTypes.pircent} />
                    </Grid>
                    <Grid item>
                        <CalculatorActionButton actionType={CalculatorActionTypes.division} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container spacing={1} justifyContent='space-between'>
                    <Grid item>
                        <CalculatorButton btnCaption='7' />
                    </Grid>
                    <Grid item>
                        <CalculatorButton btnCaption='8' />
                    </Grid>
                    <Grid item>
                        <CalculatorButton btnCaption='9' />
                    </Grid>
                    <Grid item>
                        <CalculatorActionButton actionType={CalculatorActionTypes.multiplication} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container spacing={1} justifyContent='space-between'>
                    <Grid item>
                        <CalculatorButton btnCaption='4' />
                    </Grid>
                    <Grid item>
                        <CalculatorButton btnCaption='5' />
                    </Grid>
                    <Grid item>
                        <CalculatorButton btnCaption='6' />
                    </Grid>
                    <Grid item>
                        <CalculatorActionButton actionType={CalculatorActionTypes.subtraction} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container spacing={1} justifyContent='space-between'>
                    <Grid item>
                        <CalculatorButton btnCaption='1' />
                    </Grid>
                    <Grid item>
                        <CalculatorButton btnCaption='2' />
                    </Grid>
                    <Grid item>
                        <CalculatorButton btnCaption='3' />
                    </Grid>
                    <Grid item>
                        <CalculatorActionButton actionType={CalculatorActionTypes.addition} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container spacing={1} justifyContent='space-between'>
                    <Grid item>
                        <CalculatorButton btnCaption='00' />
                    </Grid>
                    <Grid item>
                        <CalculatorButton btnCaption='0' />
                    </Grid>
                    <Grid item>
                        <CalculatorButton btnCaption=',' />
                    </Grid>
                    <Grid item>
                        <CalculatorButton
                            btnCaption='='
                            handleOnClick={handleOnCalculate}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CalculatorActions;