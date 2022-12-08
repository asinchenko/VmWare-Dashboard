import React, {useState} from 'react'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password)
    }
  return (
    <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="m-40 p-20 bg-gray-200 border-4">
            <h3 className="flex justify-center">Login</h3>
            <label>Email</label>
            <input className="w-full mt-2 mb-2"
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}    
            />
            <label>Password</label>
            <input className="w-full mt-2 mb-4"
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}    
            />
            <button>Login!</button>
        </form>
    </div>
  )
}

export default Login