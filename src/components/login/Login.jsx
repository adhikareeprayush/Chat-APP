import './login.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleAvatarChange = () => {
      const file = fileInputRef.current?.files?.[0];
      if (file) {
        setAvatar(file);
      }
    };

    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.addEventListener('change', handleAvatarChange);
    }

    return () => {
      if (fileInput) {
        fileInput.removeEventListener('change', handleAvatarChange);
      }
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const imgUrl = await upload(avatar);

      await setDoc(doc(db, 'users', res.user.uid), {
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, 'userchats', res.user.uid), {
        chats: [],
      });

      toast.success('User registered successfully! Please login to continue');
    } catch (err) {
      console.log(err);
      if (err.code === 'auth/email-already-in-use') {
        toast.error('The email address is already in use. Please try a different email or log in.');
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="form-section">
          <h2>Welcome back,</h2>
          <form onSubmit={handleLogin}>
            <input type="email" name="email" placeholder='Email' />
            <input type="password" name="password" placeholder='Password' />
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="separator"></div>
        <div className="form-section">
          <h2>Join us today!</h2>
          <form onSubmit={handleRegister}>
            <label htmlFor="fileInput">
              <img src={avatar ? URL.createObjectURL(avatar) : "./avatar.png"} alt="" />
              Upload an image
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
            />
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;