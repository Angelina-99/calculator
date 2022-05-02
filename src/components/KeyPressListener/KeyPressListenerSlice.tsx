import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from '../../store';

export interface PressedKey {
    key: string,
    pressedAt: number,
}

export interface KeyPressListenerState {
    keyPressed: PressedKey,
}

const initialState: KeyPressListenerState = {
    keyPressed: {
        key: '',
        pressedAt: Date.now(),
    }
}

const KeyPressListenerSlice = createSlice({
    name: 'KeyPressListener',
    initialState,
    reducers: {
        setKey(state, action: PayloadAction<PressedKey>) {
            state.keyPressed = action.payload;
        },
    }
});

export default KeyPressListenerSlice.reducer;

export const { setKey } = KeyPressListenerSlice.actions;
export const selectKey = (state: RootState) => state.KeyPressListener.keyPressed;