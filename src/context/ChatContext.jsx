import {
  createContext,
  useState,
  useReducer,
  useEffect,
  useContext,
} from "react";
import { supabase } from "../supabase/client";
import { AuthContext } from "./AuthContext";


export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INTIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    console.log(action, "action");
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.user.id > action.payload.id
              ? currentUser.user.id + action.payload.id
              : action.payload.id + currentUser.user.id,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INTIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
