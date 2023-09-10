import cookie from "react-cookies";
import { redirect } from "react-router-dom";

const MyUserReducer = (currentState, action) => {
    switch (action.type) {
        case "login":
            return action.payload;
        case "logout":
            {
                redirect("/")
                cookie.remove("token");
                cookie.remove("user");
                return null;
            }
        default:
            return currentState;
    }
};

export default MyUserReducer;