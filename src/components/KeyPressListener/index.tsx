import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectKey, setKey } from './KeyPressListenerSlice';
import KeyUpListener from './KeyUpListener';

const KeyPressListener = () => {
    // Для Enter и Backspace
    KeyUpListener();

    const dispatch = useAppDispatch();
    
    useEffect(() => {
        const handleOnKeyPress = (e: KeyboardEvent) => {
            // Используется регулярное выражение, чтобы сохранять в state только необходимое
            const reg = /\-|\+|\*|\/|\%|\=|\(|\)|\,|\.|^[0-9]$/
            if (reg.test(e.key)) {
                dispatch(setKey({
                    key: e.key,
                    pressedAt: Date.now()
                }));
            }
        };

        window.addEventListener('keypress', handleOnKeyPress);
        return () => window.removeEventListener('keypress', handleOnKeyPress);
    }, [dispatch]);
};

export default KeyPressListener;
