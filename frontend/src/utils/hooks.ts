import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { store } from '../../store';
import { useSelector } from 'react-redux';
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;


export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;