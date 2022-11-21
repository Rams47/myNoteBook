import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

export const Login = () => {
    const [credential, setCredential] = useState({email: "", password: "" })
    let history = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credential.email,password: credential.password})
        });

        const json = await response.json();
        console.log(json);

        if(json.sucess){
            //redirect
            localStorage.setItem('token',json.authtoken);
            history("/");

        }
        else{
            alert("invalid credentials");
        }
    }

    const onchange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onchange} value={credential.email} id="email" name="email" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onchange} id="password" value={credential.password} name="password"/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
