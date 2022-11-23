import { configureStore } from '@reduxjs/toolkit';
import { robotReducer } from '../../features/reducer/reducer';

export const appStore = configureStore({
    reducer: {
        robots: robotReducer
    },
    preloadedState: { robots: [] }
});

export type rootStore = typeof appStore;

export type rootState = ReturnType<typeof appStore.getState>;
