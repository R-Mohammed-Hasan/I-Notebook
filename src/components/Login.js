import React,{useState} from "react";
import { useHistory } from "react-router-dom";

export default function Login() {

  let history = useHistory();
  const [credentials, setCredentials] = useState({email: '', password: ''});

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const onSubmitHandler  = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login',{
      method: 'POST',
      headers: {
          'Content-Type':'application/json'
      },
      body: JSON.stringify(credentials)
    });
    let json = await response.json();
    console.log(json);
    if(json.authToken){
      localStorage.setItem("token",json.authToken);
      history.push("/");
    }else{
      alert('Invalid credentials');
    }

  }
  return (
    <>
      <h2>Login</h2>
      <form className="mt-5" onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="exampleInputPassword1"
            value={credentials.password}
            onChange={onChange}

          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
