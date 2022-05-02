import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setKey } from './KeyPressListenerSlice';

const KeyUpListener = () => {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        const handleOnKeyUp = (e: KeyboardEvent) => {
            e.preventDefault();
            const reg = /Enter|Backspace/
            if (reg.test(e.key)) {
                dispatch(setKey({
                    key: e.key,
                    pressedAt: Date.now()
                }));
            }
        }

        window.addEventListener('keyup', handleOnKeyUp)
        return () => window.removeEventListener('keyup', handleOnKeyUp);
    }, [dispatch]);
};

export default KeyUpListener;
