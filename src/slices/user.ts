import { createAsyncThunk,createSlice,PayloadAction } from "@reduxjs/toolkit";

import axios from 'axios'

type User = {
    _id:string
    username:string
    firstname:string
    lastname:string
    email:string
    password:string
    photo:string
    role:string
}


type UserStateType = {
    currentUser:User,
    loading:boolean,
    error:string
}

type loginData = {
    email:string,
    password:string
}

type registerData = {
    email:string,
    password:string
}

const initialState:UserStateType = {
    currentUser:{
        _id:'',
    username:'',
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    photo:'',
    role:''
    },
    loading:false,
    error:''
}


export const login = createAsyncThunk(
    "user/login", async (data:loginData) => {
      try {

        const response = await axios.post('http://localhost:4000/user/login',data)

        localStorage.setItem('token',JSON.stringify(response.data.token))

        return response.data.user


     
      } catch (err) {
        console.log(err)
          //rejectWithValue(err.error)
      }
    });


    export const register = createAsyncThunk(
        "user/register", async (data:registerData) => {
          try {
    
            const response = await axios.post('http://localhost:4000/user/register',data)

            localStorage.setItem('token',JSON.stringify(response.data.token))
    
            return response.data.user
         
          } catch (err:any) {
            console.log(err.response.data.error)
              //rejectWithValue(err.error)
          }
        });
    



const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logout:(state) =>{
            localStorage.removeItem('user') 
           state.currentUser = {
            _id:'',
        username:'',
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        photo:'',
        role:''
        }
        
           state.loading = false
           state.error = ''
        },
        loadApp:(state) => {

        }
    },
    extraReducers: builder => {
        builder.addCase(login.pending, state => {
          state.loading = true
        })
        builder.addCase(
          login.fulfilled,
          (state, action:PayloadAction<User>) => {
            state.loading = false
            state.currentUser = action.payload
            state.error = ''
          }
        )
        builder.addCase(login.rejected, (state, action) => {
          state.loading = false
          state.error = action.error.message || 'Something went wrong'
        })
        builder.addCase(register.pending, state => {
            state.loading = true
          })
          builder.addCase(
            register.fulfilled,
            (state, action:PayloadAction<User>) => {
              state.loading = false
              state.currentUser = action.payload
              state.error = ''
            }
          )
          builder.addCase(register.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Something went wrong'
          })
      }
   
})

export const {logout} = userSlice.actions


export default userSlice.reducer