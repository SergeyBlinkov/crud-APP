import { createSlice } from "@reduxjs/toolkit"
 
 export const userSlice = createSlice({
     name: 'user',
     initialState: {
         value: [

         ]
     },
     reducers: {
         
         inits: (state,action) => {
            let allUser = action.payload
            
         const userFunc = () => { return allUser === undefined ? state.value : allUser.map((prevState) => ({
                ...prevState,
                data: {
                    ...prevState.data,
                    isReady: true
                }
            }));
            }
            return {
                ...state,
                value: userFunc()
            }
         },
         push: (state,action) => {
             let copy = {...action.payload,
            data: {
                ...action.payload.data,
                isReady: true
            }}
           state.value.push(copy)
         },
         del: (state, action) => {
             
            state.value = state.value.filter((data) =>data._id !== action.payload)
         },
         changeBool: (state,action) => {
             
            let user = action.payload
            let copy = {...user,
            data: {
                ...user.data,
                isReady: !user.data.isReady
            }}
             state.value = state.value.map((data) => data._id === action.payload._id ? copy : data)
         },
         upd: (state,action) => {
            
            let user = action.payload
            let copy = {...user,
            data: {
                ...user.data,
                isReady: user.data.isReady
            }}
            state.value = state.value.map(data=>{
              return data._id === user._id ? copy : data})  
         },
         saveUpdate: (state,action) => {
             let user = action.payload
             let copy = {...user,
                 data: {
                     ...user.data,
                     isReady: !user.data.isReady
                 }}
             state.value = state.value.map(data=>{
                 return data._id === user._id ? copy : data})
         }
     }
 })

 export const {inits, push,del,upd,changeBool,saveUpdate} = userSlice.actions

 export default userSlice.reducer

