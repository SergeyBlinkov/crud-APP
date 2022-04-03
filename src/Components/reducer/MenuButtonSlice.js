import {createSlice} from "@reduxjs/toolkit";

export const MenuButtonSlice = createSlice({
    name: 'user',
    initialState: {
        value: false
    },
    reducers: {
        TOGGLE_SHOW: (state) => {
            state.value = !state.value
        }
    }
})
export const {TOGGLE_SHOW} = MenuButtonSlice.actions

export default MenuButtonSlice.reducer