import React, { createContext, useReducer } from 'react'
import ReadMessageReducer, { initialState } from './ReadMessageReducer'


const readStatusContext = createContext();
const ReadMessageContext = ({ children }) => {
    const [stateMessages, dispatch] = useReducer(ReadMessageReducer, initialState)
    return (
        <readStatusContext.Provider value={ [stateMessages, dispatch] }>{ children }</readStatusContext.Provider>
    )
}
export { readStatusContext }
export default ReadMessageContext;
