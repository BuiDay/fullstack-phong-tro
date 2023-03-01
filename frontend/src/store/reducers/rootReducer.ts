import {combineReducers} from 'redux'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
import {persistReducer} from "redux-persist"
import authReducer from '../features/auth/authSilce'
import appReducer from '../features/app/appSilce'
import postReducer from '../features/post/postSilce'
import { RootState } from '../redux'


const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key:'auth',
    whitelist:['isLoggedIn','token']
}

const rootReducer = combineReducers({
    auth:persistReducer<any, any>(authConfig,authReducer),
    app:appReducer,
    post:postReducer
})

export default rootReducer
