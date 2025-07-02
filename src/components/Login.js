import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Assuming AuthContext is set up as shown earlier

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { setUser } = useAuth();

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: input.email,
            password: input.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);

          // Decode the token or use the response data to set the user
          const userData = { role: "admin" }; // Replace with actual decoding logic
          setUser(userData);

          // Redirect to the dashboard or another page
          window.location.href = "/dashboard";
        } else {
          setError("Invalid email or password");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    } else {
      alert("Please provide a valid input");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-custom">
      <div className="container bg-black p-5">
        <form onSubmit={handleSubmitEvent} className="form">
          <div className="form_control">
            <label htmlFor="user-email">Email</label>
            <input
              type="email"
              id="user-email"
              name="email"
              aria-describedby="user-email"
              aria-invalid="false"
              onChange={handleInput}
              className="form-control"
            />
          </div>
          <div className="form_control my-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              aria-describedby="user-password"
              aria-invalid="false"
              onChange={handleInput}
              className="form-control"
            />
          </div>
          <button className="btn px-5 btn-danger">Login</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
