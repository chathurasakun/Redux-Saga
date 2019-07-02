import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import * as KeyConstants from '../KeyConstants';
import { GET_LIST_FAILURE, GET_LIST_REQUEST, GET_LIST_SUCCESS } from '../Actions/CartAction';

const INITIAL_STATE = {
	cardList: [],
	cardData: [],
	loading: false,
	error: ''
};

const UserReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case KeyConstants.default.ADD_TO_CART: {
			return {
				...state,
				cardList: [...state.cardList, action.payload]
			}
		}
		case KeyConstants.default.REMOVE_FROM_CART: {
			let cardList = state.cardList.filter((existingItem) => existingItem.id !== action.payload.id);
			return { ...state, cardList }
		}
		case GET_LIST_REQUEST: {
			return {
				...state,
				loading: true,
				error: ''
			};
		}
		case GET_LIST_SUCCESS: {
			return {
				...state,
				cardData: action.payload,
				loading: false
			}
		}
		case GET_LIST_FAILURE: {
			return {
				...state,
				loading: false,
				error: action.payload
			};
		}
		default:
			return state;
	}
};

const persistConfig = {
	key: 'card',
	storage: storage,
	timeout: null,
	blacklist: ['cardData']
};

export default persistReducer(persistConfig, UserReducer);