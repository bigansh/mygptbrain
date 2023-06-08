import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectAuthError } from "../store/reducers/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
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
      <button type="submit">Login</button>
      {authError && <div>{authError}</div>}
    </form>
  );
};

export default LoginForm;
