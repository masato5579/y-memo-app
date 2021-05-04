export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: {
      favos: userState.favos,
      isSignedIn: true,
      role: userState.role,
      uid: userState.uid,
      username: userState.username,
    },
  };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      favos: [],
      isSignedIn: false,
      role: "",
      uid: "",
      username: "",
    },
  };
};

export const FETCH_FAVOS = "FETCH_FAVOS";
export const fetchFavosAction = (favoList) => {
  return {
    type: "FETCH_FAVOS",
    payload: {
      favos: favoList,
    },
  };
};
