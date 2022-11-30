import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import { message } from 'antd';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { LogoIcon } from '~/components/Icons';
import { storage, auth } from '~/firebase/config';
import styles from '../Login/Login.module.scss';

const cx = className.bind(styles);
function Register() {
    const [err, setErr] = useState(false);
    const [photoURL, setPhotoURL] = useState('');

    const avatarRef = useRef();

    useEffect(() => {
        message.config({
            top: 250,
            duration: 2,
        });
    }, []);

    useEffect(() => {
        const handlePreviewAvatar = () => {
            const _url = URL.createObjectURL(avatarRef.current?.files?.[0]);
            setPhotoURL(_url);
        };
        avatarRef?.current?.addEventListener('change', handlePreviewAvatar);

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            avatarRef?.current?.addEventListener('change', handlePreviewAvatar);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        let photoURL = null;

        console.log({ displayName, email, password, file });

        if (file) {
            const storageRef = ref(storage, `avatar-${Date.now()}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.log('unsuccessful uploads', error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    photoURL = downloadURL;
                }
            );
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName,
                    photoURL,
                });
                e.target.reset();
                setPhotoURL('');
                message.success('Your account is ready!');
            })
            .catch((error) => {
                setErr(true);
                console.log('unsuccessful create account', error);
            });
    };
    return (
        <div className={cx('formContainer')}>
            <div className={cx('formWrapper')}>
                <div className={cx('logo')}>
                    <LogoIcon width={300} height={60} />
                </div>
                <span style={{ marginBottom: 16 }} className={cx('title')}>
                    Register Account
                </span>
                <form onSubmit={handleSubmit}>
                    <input required name="display_name" type="text" placeholder="display name" />
                    <input required name="email" type="email" placeholder="email" />
                    <input required name="password" type="password" placeholder="password" />
                    <input ref={avatarRef} style={{ display: 'none' }} type="file" id="file" />
                    <label htmlFor="file">
                        <img
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                            src={
                                photoURL
                                    ? photoURL
                                    : 'https://www.shareicon.net/data/512x512/2016/08/18/809259_user_512x512.png'
                            }
                            alt="avatar"
                        />
                        <span>Add an avatar</span>
                    </label>
                    {err && <span>Something went wrong</span>}
                    <button type="submit">Sign up</button>
                </form>
                <p>
                    You do have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
