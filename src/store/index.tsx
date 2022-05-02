import { configureStore } from '@reduxjs/toolkit';
import CalculatorSlice from '../components/Calculator/CalculatorSlice';
import KeyPressListenerSlice from '../components/KeyPressListener/KeyPressListenerSlice';

const store = configureStore({
    reducer: {
        Calculator: CalculatorSlice,
        KeyPressListener: KeyPressListenerSlice,
    },
});
  
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
  
  