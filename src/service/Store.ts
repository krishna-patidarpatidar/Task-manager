
import { configureStore } from "@reduxjs/toolkit";
import AuthApi from "./Auth";


const store = configureStore({
    reducer: {
       
        [AuthApi.reducerPath]: AuthApi.reducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(AuthApi.middleware)

})
export default store;