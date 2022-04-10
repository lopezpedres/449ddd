const initialState = { lastMessageRead: false, unReadMessages: [] }
const ReadMessageReducer = (state, action) => {
    let type = action.type
    switch (type) {
        case "new-message":
            let message = action.message
            return {
                ...state,
                lastMessageRead: false,
                unReadMessages: [...state.unReadMessages, message]

            }
        case "get-message":
            let fromDbMessage = action.message
            return {
                ...state,
                lastMessageRead: false,
                unReadMessages: [...fromDbMessage]

            }
        case "reset":
            let messages = action.message
            return { ...state, lastMessageRead: true, unReadMessages: [...state.unReadMessages.filter(urm => !messages.has(urm))] }
        case "read-message":
            return { ...state, lastMessageRead: true}

        default:
            return state
    }
}
export { initialState }
export default ReadMessageReducer