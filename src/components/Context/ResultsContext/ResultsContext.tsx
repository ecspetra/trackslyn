import React, { createContext } from 'react';

export const initialState = {
    result: null
};

export type ResultStore = typeof initialState;

type ResultContext = {
    result: ResultStore;
};

export const ResultsContext = createContext<ResultContext>({} as ResultContext);