import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup(props) {
  const navigate = useNavigate()
    const [data,setData] = useState({name:"",email:"",password:"",epassword:""})
    const handleSubmit = async (e)=>{
      e.preventDefault()
      if(data.password !== data.epassword){
        props.alertFunc("Password doesn't match Confirm Password",'danger')
      }
      else{
        const response = await fetch(`http://localhost:5000/api/auth/signup`,{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              name:data.name,
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
            props.alertFunc(json.message,"danger")
          }
        }
    }
    
    const onChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
  return (
    <div className='container my-3'>
      <h1 className='my-2'>Signup to continue at iNotebook</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label for="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={data.name} minLength={3} required onChange={onChange} name='name' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label for="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={data.email} onChange={onChange} name='email' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label for="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={data.password} minLength={5} required onChange={onChange} name='password'/>
        </div>
        <div className="mb-3">
            <label for="epassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="epassword" value={data.epassword} minLength={5} required onChange={onChange} name='epassword'/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
