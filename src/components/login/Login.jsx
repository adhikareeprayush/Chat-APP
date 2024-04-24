import './login.css'
import { toast } from 'react-toastify'
import { useState } from 'react'
const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })

    const handleAvatar = e => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleLogin = e => {
        e.preventDefault()

    }

    return (
        <div className="login">
            <div className="item">
                <h2>Welcome back,</h2>
                <form action="">
                    <input type="email" name="email" placeholder='Email' idemail />
                    <input type="password" name="password" placeholder='Password' id="password" />
                    <button type="submit">Login</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Join us today!</h2>
                <form onSubmit={handleLogin}>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"} alt="" />
                        Upload an Image</label>
                    <input type="file" name="" id="file" style={{ display: "none" }} onChange={handleAvatar} />
                    <input type="text" name="username" placeholder='Username' id="" />
                    <input type="email" name="email" placeholder='Email' id="" />
                    <input type="password" name="password" placeholder='Password' id="" />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Login