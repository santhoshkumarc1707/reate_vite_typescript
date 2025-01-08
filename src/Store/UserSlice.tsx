import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the User object
interface User {
  access_token: string | null;
  // Other user properties like name, email, etc. can be added here if necessary
}

// Define the initial state
interface UserState {
  user: User | null; // `user` can either be `null` or an object of type `User`
  isAuthenticated: boolean;
  isError: boolean; // Track if there is an error
}

const initialState: UserState = {
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
    setUser: (state, action: PayloadAction<User>) => {
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
    setErrorStatus: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload; // Set error status
    },
  },
});

// Export the action creators
export const { setUser, logout, setErrorStatus } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
