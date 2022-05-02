import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

export enum CalculatorActionTypes {
    addition = 'addition',
    subtraction = 'subtraction',
    multiplication = 'multiplication',
    division = 'division',
    pircent = 'pircent',
    sqrt = 'sqrt',
}

export const CalculatorActions: { [key: string]: string} = {
    addition: '+',
    subtraction: '-',
    multiplication: '\u00D7',
    division: '\u00F7',
    pircent: '%',
    sqrt: '\u221A',
}

export interface CalculatedResult {
    value: number,
    isError: boolean,
}

const calculatedFromMathStr = (mathStr: string): CalculatedResult => {
    if (mathStr.startsWith(`|${CalculatorActionTypes.subtraction}|`)) {
        mathStr = '0' + mathStr;
    }
    let mathStrArr = mathStr.split('|');
    mathStrArr = mathStrArr.filter(item => item !== '');

    // Calculate pircent
    for (let i = 0; i < mathStrArr.length; i += 1) {
        if (mathStrArr[i] === CalculatorActionTypes.pircent) {
            const beforeItem = Number(mathStrArr[i-1]);
            if (!beforeItem && beforeItem !== 0 && beforeItem !== 0) {
                return { value: NaN, isError: true }
            }
            let result = NaN;
            if (
                mathStrArr[i-2] &&
                mathStrArr[i-3] &&
                (
                    mathStrArr[i-2] === CalculatorActionTypes.addition ||
                    mathStrArr[i-2] === CalculatorActionTypes.subtraction
                )
            ) {
                const pircentFrom = Number(mathStrArr[i-3]);
                if (pircentFrom) {
                    const pircent = pircentFrom * beforeItem / 100;
                    if (mathStrArr[i-2] === CalculatorActionTypes.addition) {
                        result = pircentFrom + pircent;
                    
                    } else {
                        result = pircentFrom - pircent;
                    }
                    mathStrArr[i - 3] = 'empty';
                    mathStrArr[i - 2] = 'empty';
                }
            } else {
                result = beforeItem / 100;
            }
            if (!result && result !== 0) {
                return { value: NaN, isError: true }
            }
            mathStrArr[i - 1] = 'empty';
            mathStrArr[i] = result.toString();
        }
    }
    mathStrArr = mathStrArr.filter(item => item !== 'empty');

    // Calculate multiplication, division, sqrt
    for (let i = 0; i < mathStrArr.length; i += 1) {
        if (
            mathStrArr[i] === CalculatorActionTypes.multiplication ||
            mathStrArr[i] === CalculatorActionTypes.division ||
            mathStrArr[i] === CalculatorActionTypes.sqrt
        ) {
            const beforeItem = Number(mathStrArr[i-1]);
            const nextItem = Number(mathStrArr[i+1]);
            if (!nextItem && nextItem !== 0 || !beforeItem && beforeItem !== 0 && mathStrArr[i] !== CalculatorActionTypes.sqrt) {
                return { value: NaN, isError: true }
            }
            let result = NaN;
            if (mathStrArr[i] === CalculatorActionTypes.sqrt) {
                result = Math.sqrt(nextItem);
                if (beforeItem) {
                    result = result * beforeItem;
                    mathStrArr[i - 1] = 'empty';
                }
            }
            if (mathStrArr[i] === CalculatorActionTypes.multiplication) {
                result = beforeItem * nextItem;
                mathStrArr[i - 1] = 'empty';
            }
            if (mathStrArr[i] === CalculatorActionTypes.division) {
                result = beforeItem / nextItem;
                mathStrArr[i - 1] = 'empty';
            }
            if (!result && result !== 0) {
                return { value: NaN, isError: true }
            }
            mathStrArr[i] = 'empty';
            mathStrArr[i + 1] = result.toString();
        }
    }
    mathStrArr = mathStrArr.filter(item => item !== 'empty');

    // Calculate addition and subtraction
    for (let i = 0; i < mathStrArr.length; i += 1) {
        if (mathStrArr[i] === CalculatorActionTypes.addition || mathStrArr[i] === CalculatorActionTypes.subtraction) {
            const beforeItem = Number(mathStrArr[i-1]);
            const nextItem = Number(mathStrArr[i+1]);
            if (!beforeItem && beforeItem !== 0 || !nextItem && nextItem !== 0) {
                return { value: NaN, isError: true }
            }
            let result = NaN;
            if (mathStrArr[i] === CalculatorActionTypes.addition) {
                result = beforeItem + nextItem;
            }
            if (mathStrArr[i] === CalculatorActionTypes.subtraction) {
                result = beforeItem - nextItem;
            }
            if (!result && result !== 0) {
                return { value: NaN, isError: true }
            }
            mathStrArr[i - 1] = 'empty';
            mathStrArr[i] = 'empty';
            mathStrArr[i + 1] = result.toString();
        }
    }
    mathStrArr = mathStrArr.filter(item => item !== 'empty');

    let result = NaN;
    if (mathStrArr.length !== 1) {
        return { value: NaN, isError: true }
    }

    result = Number(mathStrArr[0])
    if (!result && result !== 0) {
        return { value: NaN, isError: true }
    }

    return { value: result, isError: false}
}

export interface CalculatorState {
    inputValue: string,
    mathStr: string,
    result: string,
}

export const initialState: CalculatorState = {
    inputValue: '',
    mathStr: '',
    result: '0',
};

const calculatorSlice = createSlice({
    name: 'Calculator',
    initialState,
    reducers: {
        clearInputValue(state) {
            state.inputValue = '';
            state.mathStr = '';
            state.result = '0';
        },
        removeLast(state) {
            if (state.inputValue.length > 0) {
                state.inputValue = state.inputValue.slice(0, (state.inputValue.length - 1));
            }
            if (state.mathStr.length > 0) {
                if (state.mathStr.endsWith('|')) {
                    state.mathStr = state.mathStr.slice(0, state.mathStr.lastIndexOf('|'));
                    state.mathStr = state.mathStr.slice(0, state.mathStr.lastIndexOf('|'));
                } else {
                    state.mathStr = state.mathStr.slice(0, (state.mathStr.length - 1));
                }
            }
        },
        addInputValue(state, action: PayloadAction<string>) {
            if (!state.mathStr.endsWith(`|${CalculatorActionTypes.pircent}|`)) {
                if (action.payload === ',') {
                    if (!state.mathStr.endsWith('.')) {
                        state.mathStr = state.mathStr + '.';
                        state.inputValue = state.inputValue + action.payload;
                        return;
                    } else {
                        return;
                    }
                }
                if (action.payload === ')') {
                    if (state.mathStr.endsWith('(')) {
                        return;
                    }
                    const countOpened = state.mathStr.split("(").length - 1;
                    const countClosed = state.mathStr.split(")").length - 1;
                    if (countOpened <= countClosed) {
                        return;
                    }
                } 
                state.inputValue = state.inputValue + action.payload;
                state.mathStr = state.mathStr + action.payload;
            }
        },
        addNewAction(state, action: PayloadAction<CalculatorActionTypes>) {
            let shouldAdd = false;
            let strToAdd = '';
            let shouldRemoveLastAction = false;
            switch (action.payload) {
                case CalculatorActionTypes.sqrt: {
                    if (!state.mathStr.endsWith(`|${CalculatorActionTypes.pircent}|`) && !state.mathStr.endsWith(`|${CalculatorActionTypes.sqrt}|`)) {
                        shouldAdd = true;
                    }
                    if (state.mathStr.length === 0 || state.mathStr.endsWith('|')) {
                        strToAdd = `${action.payload}|`;
                    }
                    break;
                }
                case CalculatorActionTypes.pircent: {
                    if (state.mathStr !== '' && !state.mathStr.endsWith('|')) {
                        shouldAdd = true;
                        strToAdd = `|${action.payload}|`;
                    }
                    break;
                }
                default: {
                    shouldAdd = true;
                    if (state.mathStr === '') {
                        state.mathStr = '0';
                    } else {
                        if (state.mathStr.endsWith('|') && !state.mathStr.endsWith(`|${CalculatorActionTypes.pircent}|`)) {
                            shouldRemoveLastAction = true;
                        }
                        if (state.mathStr.endsWith(`|${CalculatorActionTypes.pircent}|`)) {
                            strToAdd = `${action.payload}|`;
                        }
                    }
                }
            }
            if (shouldRemoveLastAction) {
                state.inputValue = state.inputValue.slice(0, (state.inputValue.length - 1));
                state.mathStr = state.mathStr.slice(0, state.mathStr.lastIndexOf('|'));
                state.mathStr = state.mathStr.slice(0, state.mathStr.lastIndexOf('|'));
            }
            if (shouldAdd) {
                if (strToAdd === '') {
                    strToAdd = `|${action.payload}|`;
                }
                state.inputValue = state.inputValue + `${CalculatorActions[action.payload]}`;
                state.mathStr = state.mathStr + strToAdd;
            }
        },
        calculate(state) {
            let calculated: CalculatedResult = { value: NaN, isError: true }

            if (state.mathStr.lastIndexOf('(') !== -1) {
                const countOpened = state.mathStr.split("(").length - 1;
                const countClosed = state.mathStr.split(")").length - 1;
                let countToClose = countOpened - countClosed;
                if (countToClose < 0) {
                    return;
                }
                while (countToClose > 0) {
                    state.mathStr += ')';
                    state.inputValue += ')';
                    countToClose -= 1;
                }
                let strToCalculate = state.mathStr;
                for (let i = 0; i < countOpened; i += 1) {
                    const closeIndex = strToCalculate.indexOf(')');
                    const openIndex = strToCalculate.slice(0, closeIndex).lastIndexOf('(');
                    const strInside = strToCalculate.slice(openIndex + 1, closeIndex);
                    const calculatedInside = calculatedFromMathStr(strInside);
                    if (calculatedInside.isError) {
                        state.result = 'Error';
                        state.inputValue = '';
                        state.mathStr = '';
                        return;
                    }
                    const insteadParentheses = strToCalculate[openIndex - 1] !== '|' ? `|${CalculatorActionTypes.multiplication}|${calculatedInside.value}` : `${calculatedInside.value}`;
                    strToCalculate = strToCalculate.slice(0, openIndex) + insteadParentheses + strToCalculate.slice(closeIndex + 1, strToCalculate.length + 1);
                }
                calculated = calculatedFromMathStr(strToCalculate);
            } else {
                calculated = calculatedFromMathStr(state.mathStr);
            }

            if (calculated.isError) {
                state.result = 'Error';
                state.mathStr = '';
                state.inputValue = '';
            } else {
                state.result = (Math.round(calculated.value * 1000000000) / 1000000000).toString();
            }
        },
    },
});

export default calculatorSlice.reducer;

export const {
    clearInputValue,
    removeLast,
    addInputValue,
    addNewAction,
    calculate,
} = calculatorSlice.actions;
export const selectInputValue = (state: RootState) => state.Calculator.inputValue;
export const selectResult = (state: RootState) => state.Calculator.result;
