import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, selectAuthError } from "../store/reducers/authSlice";

const SignupForm = () => {
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Signup</button>
      {authError && <div>{authError}</div>}
    </form>
  );
};

export default SignupForm;
