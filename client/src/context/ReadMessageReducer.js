const initialState = { unReadMessages: [] }
const ReadMessageReducer = (state, action) => {
    let type = action.type
    let message = action.message
    switch (type) {
        case "new-message":
            return {
                ...state,
                unReadMessages: [...state.unReadMessages, message]

            }
        case "reset":
            console.log(message)
            return {...state,unReadMessages:[state.unReadMessages.filter(urm=> !message.has(urm))]}
            
        default:
            return state
    }
}
export { initialState }
export default ReadMessageReducer