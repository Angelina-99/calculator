import reducer, { clearInputValue, removeLast, addInputValue, addNewAction, calculate, initialState, CalculatorActionTypes } from './CalculatorSlice';

describe('calculator slice tests', () => {
    it(`handle action clearInputValue`, () => {
        const action = clearInputValue;
        expect(reducer(initialState, action)).toEqual({
            inputValue: '',
            mathStr: '',
            result: '0',
        })
    });

    describe('addInputValue tests', () => {
        it(`addInputValue number`, () => {
            const action = addInputValue('1');
            expect(reducer(initialState, action)).toEqual({
                inputValue: '1',
                mathStr: '1',
                result: '0',
            })
        });

        it(`addInputValue number after %`, () => {
            const action = addInputValue('4');
            const state = {
                inputValue: '10%',
                mathStr: `10|${CalculatorActionTypes.pircent}|`,
                result: '0',
            }
            expect(reducer(state, action)).toEqual(state)
        });

        it(`addInputValue ','`, () => {
            const action = addInputValue('4');
            const state = {
                inputValue: '1,',
                mathStr: '1.',
                result: '0',
            }
            expect(reducer(state, action)).toEqual({
                ...state,
                mathStr: '1.4',
                inputValue: '1,4'
            })
        });

        it(`addInputValue ',' after %`, () => {
            const action = addInputValue(',');
            const state = {
                inputValue: '10%',
                mathStr: `10|${CalculatorActionTypes.pircent}|`,
                result: '0',
            }
            expect(reducer(state, action)).toEqual(state)
        });

        it(`addInputValue '('`, () => {
            const action = addInputValue('(');
            const state = {
                inputValue: '10',
                mathStr: `10`,
                result: '0',
            }
            expect(reducer(state, action)).toEqual({
                ...state,
                inputValue: '10(',
                mathStr: '10(',
            })
        });

        it(`addInputValue ')'`, () => {
            const action = addInputValue(')');
            const state = {
                inputValue: '10(2-4',
                mathStr: `10(2-4`,
                result: '0',
            }
            expect(reducer(state, action)).toEqual({
                ...state,
                inputValue: '10(2-4)',
                mathStr: '10(2-4)',
            })
        });

        it(`addInputValue ')' when has no '('`, () => {
            const action = addInputValue(')');
            const state = {
                inputValue: '10',
                mathStr: `10`,
                result: '0',
            }
            expect(reducer(state, action)).toEqual(state)
        });
    })
      
    describe('addNewAction tests', () => {
        describe(`${CalculatorActionTypes.addition}`, () => {
            it(`${CalculatorActionTypes.addition}`, () => {
                const action = addNewAction(CalculatorActionTypes.addition);
                const state = {
                    inputValue: '10',
                    mathStr: `10`,
                    result: '0',
                }
                expect(reducer(state, action)).toEqual({
                    inputValue: '10+',
                    mathStr: `10|${CalculatorActionTypes.addition}|`,
                    result: '0',
                })
            });
            it(`${CalculatorActionTypes.addition} after other action`, () => {
                const action = addNewAction(CalculatorActionTypes.addition);
                const state = {
                    inputValue: `10/`,
                    mathStr: `10|${CalculatorActionTypes.division}|`,
                    result: '0',
                }
                expect(reducer(state, action)).toEqual({
                    inputValue: '10+',
                    mathStr: `10|${CalculatorActionTypes.addition}|`,
                    result: '0',
                })
            });
        })
        describe(`${CalculatorActionTypes.subtraction}`, () => {
            it(`${CalculatorActionTypes.subtraction}`, () => {
                const action = addNewAction(CalculatorActionTypes.subtraction);
                const state = {
                    inputValue: '10',
                    mathStr: `10`,
                    result: '0',
                }
                expect(reducer(state, action)).toEqual({
                    inputValue: '10-',
                    mathStr: `10|${CalculatorActionTypes.subtraction}|`,
                    result: '0',
                })
            });
            it(`${CalculatorActionTypes.subtraction} after other action`, () => {
                const action = addNewAction(CalculatorActionTypes.subtraction);
                const state = {
                    inputValue: `10/`,
                    mathStr: `10|${CalculatorActionTypes.division}|`,
                    result: '0',
                }
                expect(reducer(state, action)).toEqual({
                    inputValue: '10-',
                    mathStr: `10|${CalculatorActionTypes.subtraction}|`,
                    result: '0',
                })
            });
        })
        describe(`${CalculatorActionTypes.multiplication}`, () => {
            it(`${CalculatorActionTypes.multiplication}`, () => {
                const action = addNewAction(CalculatorActionTypes.multiplication);
                const state = {
                    inputValue: '10',
                    mathStr: `10`,
                    result: '0',
                }
                expect(reducer(state, action)).toEqual({
                    inputValue: `10\u00D7`,
                    mathStr: `10|${CalculatorActionTypes.multiplication}|`,
                    result: '0',
                })
            });
            it(`${CalculatorActionTypes.multiplication} after other action`, () => {
                const action = addNewAction(CalculatorActionTypes.multiplication);
                const state = {
                    inputValue: `10+`,
                    mathStr: `10|${CalculatorActionTypes.addition}|`,
                    result: '0',
                }
                expect(reducer(state, action)).toEqual({
                    inputValue: `10\u00D7`,
                    mathStr: `10|${CalculatorActionTypes.multiplication}|`,
                    result: '0',
                })
            });
        })
        describe(`${CalculatorActionTypes.division}`, () => {
            it(`${CalculatorActionTypes.division}`, () => {
                const action = addNewAction(CalculatorActionTypes.division);
                const state = {
                    inputValue: '10',
                    mathStr: `10`,
                    result: '0',
                }
                expect(reducer(state, action)).toEqual({
                    inputValue: `10\u00F7`,
                    mathStr: `10|${CalculatorActionTypes.division}|`,
                    result: '0',
                })
            });
            it(`${CalculatorActionTypes.division} after other action`, () => {
                const action = addNewAction(CalculatorActionTypes.division);
                const state = {
                    inputValue: `10+`,
                    mathStr: `10|${CalculatorActionTypes.addition}|`,
                    result: '0',
                }
                expect(reducer(state, action)).toEqual({
                    inputValue: `10\u00F7`,
                    mathStr: `10|${CalculatorActionTypes.division}|`,
                    result: '0',
                })
            });
        })
        describe(`${CalculatorActionTypes.sqrt}`, () => {
            it(`${CalculatorActionTypes.sqrt}`, () => {
                const action = addNewAction(CalculatorActionTypes.sqrt);
                const state = {
                    inputValue: '10',
                    mathStr: `10`,
                    result: '0',
                }
                expect(reducer(state, action)).toEqual({
                    inputValue: `10\u221A`,
                    mathStr: `10|${CalculatorActionTypes.sqrt}|`,
                    result: '0',
                })
            });
            it(`${CalculatorActionTypes.sqrt} after other action`, () => {
                const action = addNewAction(CalculatorActionTypes.sqrt);
                const state = {
                    inputValue: `10+`,
                    mathStr: `10|${CalculatorActionTypes.addition}|`,
                    result: '0',
                }
                expect(reducer(state, action)).toEqual({
                    inputValue: `10+\u221A`,
                    mathStr: `10|${CalculatorActionTypes.addition}|${CalculatorActionTypes.sqrt}|`,
                    result: '0',
                })
            });
        })
    })
    describe('calculate tests', () => {
        it(`'10 / 2 + 4': expect 9`, () => {
            const action = calculate;
            const state = {
                inputValue: `10\u00F72+4`,
                mathStr: `10|${CalculatorActionTypes.division}|2|${CalculatorActionTypes.addition}|4`,
                result: '0',
            }
            expect(reducer(state, action)).toEqual({
                ...state,
                result: '9',
            })
        });
        it(`'12 / (2 + 4)': expect 2`, () => {
            const action = calculate;
            const state = {
                inputValue: `12\u00F7(2+4)`,
                mathStr: `12|${CalculatorActionTypes.division}|(2|${CalculatorActionTypes.addition}|4)`,
                result: '0',
            }
            expect(reducer(state, action)).toEqual({
                ...state,
                result: '2',
            })
        });
        it(`'2 * 8 - 6\u221A4': expect 4`, () => {
            const action = calculate;
            const state = {
                inputValue: `2\u00D78-6\u221A4`,
                mathStr: `2|${CalculatorActionTypes.multiplication}|8|${CalculatorActionTypes.subtraction}|6|${CalculatorActionTypes.sqrt}|4`,
                result: '0',
            }
            expect(reducer(state, action)).toEqual({
                ...state,
                result: '4',
            })
        });
        it(`'300 - 54%'`, () => {
            const action = calculate;
            const state = {
                inputValue: `300-54%`,
                mathStr: `300|${CalculatorActionTypes.subtraction}|54|${CalculatorActionTypes.pircent}`,
                result: '0',
            }
            expect(reducer(state, action)).toEqual({
                ...state,
                result: '138',
            })
        })
        it(`'54%'`, () => {
            const action = calculate;
            const state = {
                inputValue: `54%`,
                mathStr: `54|${CalculatorActionTypes.pircent}`,
                result: '0',
            }
            expect(reducer(state, action)).toEqual({
                ...state,
                result: '0.54',
            })
        })
        it(`'2 / 0'`, () => {
            const action = calculate;
            const state = {
                inputValue: `2\u00F70`,
                mathStr: `2|${CalculatorActionTypes.division}|0`,
                result: '0',
            }
            expect(reducer(state, action)).toEqual({
                ...state,
                result: 'Infinity',
            })
        })
        it(`')22-14)'`, () => {
            const action = calculate;
            const state = {
                inputValue: `)22-14)`,
                mathStr: `)2|${CalculatorActionTypes.subtraction}|14)`,
                result: '0',
            }
            expect(reducer(state, action)).toEqual({
                inputValue: '',
                mathStr: '',
                result: 'Error',
            })
        })
    })
})