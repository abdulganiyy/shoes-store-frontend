import { createAsyncThunk,createSlice,PayloadAction } from "@reduxjs/toolkit";

import axios from 'axios';


export interface Product {
    _id:string,
    title:string;
    description:string;
    photos:string[];
    discount:number;
    price:number;
    category:string;
    brand:string;
    owner:string

}

interface CartItem {
    _id:string,
    title:string;
    description:string;
    photos:string[];
    discount:number;
    price:number;
    category:string;
    brand:string;
    owner:string;
    quantity:number

}


type initialStateType = {
    products:Product[],
    cart:CartItem[],
    loading:boolean,
    error:string
}

const initialState:initialStateType = {
    products:[],
    cart:[],
    loading:false,
    error:''
}


export const fetchProducts = createAsyncThunk(
    "user/login", async () => {
      try {

        const response = await axios.get('https://immense-caverns-78231.herokuapp.com/product')

    
        return response.data.products


     
      } catch (err) {
        console.log(err)
          //rejectWithValue(err.error)
      }
    });



const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<{id:string,quantity:number}>) => {
               const quantity = action.payload.quantity
               const id = action.payload.id

               const product = state.products.find((product) => product._id === id)
               const cartItem = state.cart.find((product) => product._id === id)

               if(cartItem) return 

               if(product){
                state.cart = [...state.cart,{...product,quantity}]
               }

               
        },

        removeFromCart:(state,action:PayloadAction<{id:string}>) =>{
            const id = action.payload.id
            state.cart = state.cart.filter((product) => product._id !== id)
            
           
        },

        changeQuantity:(state,action:PayloadAction<{id:string,quantity:number}>) => {
            const quantity = action.payload.quantity
            const id = action.payload.id

            const cartItem = state.cart.find((product) => product._id === id)

            if(cartItem) {
                const newCart = state.cart.filter((product) => product._id !== id)
                state.cart = [...newCart,{...cartItem,quantity}]
            } 

        } 
    },
    extraReducers:(builder) => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true
          })
          builder.addCase(
            fetchProducts.fulfilled,
            (state, action:PayloadAction<Product[]>) => {
              state.loading = false
              state.products = action.payload
              state.error = ''
            }
          )
          builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Something went wrong'
          })
    }
})


const productsReducer = productsSlice.reducer

export const {addToCart,removeFromCart,changeQuantity} = productsSlice.actions

export default productsReducer