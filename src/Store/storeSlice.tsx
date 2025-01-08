import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the state
interface UserState {
  token: string | null; // Store the token
  isLoggedIn: boolean;
}

// Initial state
const initialState: UserState = {
  token: null,
  isLoggedIn: false,
};

// Create the slice
export const storeSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token; // Set the token in the state
      state.isLoggedIn = true; // Set the login state to true
    },
    logout: (state) => {
      state.token = null; // Clear the token
      state.isLoggedIn = false; // Set login state to false
    },
  },
});

// Export the actions
export const { setUser, logout } = storeSlice.actions;

// Export the reducer
export default storeSlice.reducer;
