import { createContext } from 'react';

export const initialState: {[key: string]: any} = {};

export type ResultStore = typeof initialState;

type ResultContext = {
    result: ResultStore;
};

export const ResultsContext = createContext<ResultContext>({} as ResultContext);