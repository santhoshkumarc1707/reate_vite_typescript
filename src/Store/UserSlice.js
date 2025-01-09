import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    user: null,
    isAuthenticated: false,
    isError: false, // Initially, no error
};
// Create the slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Action to set the user state
        setUser: (state, action) => {
            state.user = action.payload; // Set user data from payload
            state.isAuthenticated = true; // Mark as authenticated
        },
        // Action to logout the user
        logout: (state) => {
            state.user = null; // Reset user data to null
            state.isAuthenticated = false; // Mark as not authenticated
            state.isError = false; // Reset error status on logout
        },
        // Action to set the error status
        setErrorStatus: (state, action) => {
            state.isError = action.payload; // Set error status
        },
    },
});
// Export the action creators
export const { setUser, logout, setErrorStatus } = userSlice.actions;
// Export the reducer
export default userSlice.reducer;
