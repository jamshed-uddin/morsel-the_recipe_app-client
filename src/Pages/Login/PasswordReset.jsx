import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const PasswordReset = () => {
  const { email } = useParams();
  const { passwordResetHandler } = useAuthContext();
  const [emailInput, setEmailInput] = useState(email);
  const [loading, setLoading] = useState(false);
  const [showSendAlert, setShowSendAlert] = useState(false);

  const handleReset = () => {
    if (!emailInput) return;
    setLoading(true);
    passwordResetHandler(emailInput)
      .then(() => {
        setShowSendAlert((prev) => !prev);
        setLoading(false);
      })
      .catch(() => {});
  };

  return (
    <div className="w-11/12 mx-auto md:w-1/3 mt-10">
      <h1 className="text-4xl text-colorOne">Reset your password</h1>
      <p className=" text-lg leading-tight">
        To reset your password, enter your email below and submit. An email will
        be sent to you with instructions.
      </p>
      {showSendAlert ? (
        <div className="mt-6">
          <p className="text-lg leading-tight text-colorOne">
            Please check your inbox and follow the instruction to reset the
            password.
          </p>
        </div>
      ) : (
        <div className="mt-6">
          <input
            onChange={(e) => setEmailInput(e.target.value)}
            type="email"
            name="email"
            id=""
            value={emailInput}
          />
          <p className="text-end text-colorOne leading-tight">
            {!emailInput && "Fill the email field"}
          </p>
          <button
            disabled={loading}
            onClick={handleReset}
            className={`bg-colorOne text-white px-3 py-1 text-xl rounded-xl mt-1 ${
              loading && "opacity-60"
            }`}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default PasswordReset;
