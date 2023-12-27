import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  signInWithPopup,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import app from "./../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //create user
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login user
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout user
  const userLogout = () => {
    setLoading(true);
    return signOut(auth);
  };

  //update user photo name
  const updateUserNamePhoto = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //password reset
  const passwordResetHandler = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // delete user
  // const deleteUserHandler = (credential) => {
  //   const isGoogleProvided = user.providerData.some(
  //     (provider) => provider.providerId === "google.com"
  //   );

  //   return reauthenticateWithCredential(
  //     user,
  //     isGoogleProvided ? googleProvider : credential
  //   )
  //     .then((res) => {
  //       console.log(res);
  //       deleteUser(user);
  //     })
  //     .catch((error) => console.log(error));
  // };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        axios
          .post(`${import.meta.env.VITE_BASEURL}/jwt`, {
            email: currentUser?.email,
          })
          .then((res) => {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    registerUser,
    userLogin,
    userLogout,
    updateUserNamePhoto,
    signInWithGoogle,
    passwordResetHandler,
    // deleteUserHandler,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
