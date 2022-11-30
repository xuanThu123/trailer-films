import className from 'classnames/bind';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { login } from '~/app/auth/authSlice';
import { LogoIcon } from '~/components/Icons';
import { auth, googleProvider } from '~/firebase/config';
import { GoogleIcon } from './Icons';
import styles from './Login.module.scss';

const cx = className.bind(styles);
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [err, setErr] = useState(false);

    const hanleLoginWithGoogle = async () => {
        try {
            const currUser = await signInWithPopup(auth, googleProvider);
            const token = await currUser.user.getIdToken();
            dispatch(login(token));
            navigate('/');
        } catch (error) {
            console.log('[ERROR]-', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            const currUser = await signInWithEmailAndPassword(auth, email, password);
            const token = await currUser.user.getIdToken();
            dispatch(login(token));
            navigate('/');
            setErr(false);
        } catch (error) {
            setErr(true);
            console.log(error);
        }
    };
    return (
        <div className={cx('formContainer')}>
            <div className={cx('formWrapper')}>
                <div className={cx('logo')}>
                    <LogoIcon width={300} height={60} />
                </div>
                <h2 className={cx('title')}>Welcom</h2>
                <button className={cx('google-btn')} onClick={hanleLoginWithGoogle}>
                    <GoogleIcon className={cx('icon')} />
                    <span className={cx('title')}>Sign in with Google</span>
                </button>
                <div className={cx('separate')}>
                    <hr />
                    <span>OR</span>
                    <hr />
                </div>
                <form onSubmit={handleSubmit}>
                    <input required type="email" placeholder="name@work-email.com" />
                    <input required type="password" placeholder="Your Password" />
                    {err && (
                        <>
                            <span style={{ color: 'red', textAlign: 'left' }}>
                                <ExclamationCircleOutlined /> {''} Username or password is incorrect
                            </span>
                        </>
                    )}
                    <button type="submit">Sign in</button>
                </form>
                <p>
                    You don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
