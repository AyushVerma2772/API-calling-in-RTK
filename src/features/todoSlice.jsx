import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    isLoading: false,
    error: null
}



// create a Thunk Which will fetch the data.
export const getTodos = createAsyncThunk("getTodos", async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        return response.json();
    } catch (error) {
        throw Error(error)
    }
})


// create a slice
export const todoSlice = createSlice({
    name: "todoSlice",
    initialState,

    // create some extraReducers which will handle all the states of promise of getTodos
    extraReducers: builder => {

        // adding case for pending
        builder.addCase(getTodos.pending, (state) => {
            state.isLoading = true
        }),

        // adding case for fulfilled
        builder.addCase(getTodos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        }),

        // adding case for rejected
        builder.addCase(getTodos.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
    }
})


export default todoSlice.reducer;