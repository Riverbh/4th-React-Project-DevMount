import {useState, useContext} from 'react'
import axios from 'axios' 
import AuthContext from '../store/authContext'


const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)

   const authCtx = useContext(AuthContext)
 
   const submitHandler = e => {
       e.preventDefault()

       const body = {
        username,
        password
       }

       const url = 'https://socialmtn.devmountain.com'

       axios.post(register ? `${url}/register` : `${url}/login`, body)
        .then((res) => {
            console.log('AFTER AUTH', res.data)
            authCtx.login(res.data.token, res.data.userId, res.data.exp)
        })
        .catch(err => {
            setPassword('')
            setUsername('')
        })

   }



 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   className='form-input'
                   type='text'
                   placeholder='Username'
                   value={username}
                   onChange={e => setUsername(e.target.value)}/>
               <input
                   className='form-input'
                   type='password'
                   placeholder='Password'
                   value={password}
                   onChange={e => setPassword(e.target.value)}/>
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button className='form-btn' onClick={() => setRegister(!register)}>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth