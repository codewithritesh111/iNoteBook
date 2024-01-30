import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
    const navigate = useNavigate()
    const [data,setData] = useState({email:"",password:""})
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`,{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              email: data.email,
              password: data.password
            })
          });
          const json = await response.json()
          console.log(json)
          if(json.success){
            localStorage.setItem('token',json.message)
            navigate('/')
            props.alertFunc("Logged In Succesfully","success")
          }
          else{
            props.alertFunc("Invalid Crenditals","danger")
          }
    }
    
    const onChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
  return (
    <div className='container my-3'>
      <h1 className='my-2'>Login to continue at iNotebook</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label for="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={data.email} onChange={onChange} name='email' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label for="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={data.password} onChange={onChange} name='password'/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
