import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    text: "Default notification text",
    visible: false
  },
  reducers: {
    showNotification (state, action) {
      return {
        text: action.payload,
        visible: true
      }
    },
    hideNotification (state, action) {
      return {
        ...state,
        visible: false
      }
    }
  }
})


export const setNotification = (message, timeToShow) => {
  return async dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => dispatch(hideNotification()), timeToShow*1000)
  }
}

export const {showNotification, hideNotification} = notificationSlice.actions
export default notificationSlice.reducer