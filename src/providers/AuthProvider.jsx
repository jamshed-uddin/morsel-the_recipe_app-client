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

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setLoading(false);
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
