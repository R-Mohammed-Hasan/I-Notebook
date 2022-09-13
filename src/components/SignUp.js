import React,{useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from './../context/alert/AlertContext'

export default function SignUp() {
  let showAlert = useContext(AlertContext);

  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({name: '',email: '', password: '',cpassword: ''});

  const onSubmitHandler  = async (event) => {
    event.preventDefault();
    let {name, email, password} = credentials;
    const response = await fetch('http://localhost:5000/api/auth/create',{
      method: 'POST',
      headers: {
          'Content-Type':'application/json'
      },
      body: JSON.stringify({name, email, password})
    });
    let json = await response.json();
    console.log(json);

    if(json.authToken){
      localStorage.setItem("token",json.authToken);
      navigate("/");
      showAlert("Logged in successfully..!","success");
    }else{
      showAlert("Invalid credentials","danger");
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
    <div className="container">
      <h2>New User ? Sign Up now...</h2>
      <form className="mt-5" onSubmit={onSubmitHandler}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
            minLength="4"
          />
        </div>
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
            onChange={onChange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={onChange}
            required
            minLength="5"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword"
            onChange={onChange}
            required
            minLength="5"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
      </div>
    </>
  );
}
