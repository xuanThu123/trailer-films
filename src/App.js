import { onAuthStateChanged } from 'firebase/auth';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { login } from '~/app/auth/authSlice';
import { auth } from '~/firebase/config';
import { DefaultLayout } from '~/layouts';
import { privateRoutes, publicRoutes } from '~/routes/routes';
import { tokenSelector } from './app/store/selector';
import ProtectedPage from './components/ProtectedPage/ProtectedPage';

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const token = useSelector(tokenSelector);

    useEffect(() => {
        const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);

        const handleScrolling = () => {
            if (window.oldScroll < (document.documentElement.scrollTop || window.scrollY)) {
                $('header')?.classList.remove('nav-down');
                $('header')?.classList.add('nav-up');

                if ($('.SearchFeature_wrapper__YI0Xl')) {
                    $('.SearchFeature_wrapper__YI0Xl').style.marginTop = 0;
                }

                $$('.Slider_progress-bar__Sh5ig').forEach((elm) => (elm.style.top = 0));
            } else {
                $('header')?.classList.remove('nav-up');
                $('header')?.classList.add('nav-down');

                if ($('.SearchFeature_wrapper__YI0Xl')) {
                    $('.SearchFeature_wrapper__YI0Xl').style.marginTop = '64px';
                }

                document
                    .querySelectorAll('.Slider_progress-bar__Sh5ig')
                    .forEach((elm) => (elm.style.top = '64px'));
            }

            window.oldScroll = document.documentElement.scrollTop || window.scrollY;
        };

        window.addEventListener('scroll', handleScrolling);

        return () => window.removeEventListener('scroll', handleScrolling);
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (!token) {
                    user.getIdToken().then((token) => {
                        dispatch(login(token));
                        navigate(location.pathname);
                    });
                }
            } else {
                navigate('/login');
            }
        });

        return () => unsubscribe();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Routes>
                {publicRoutes.map((route, index) => (
                    <Route key={index} path={route.path} element={<route.component />} />
                ))}
                {privateRoutes.map((route, index) => {
                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <ProtectedPage>
                                        <route.component />
                                    </ProtectedPage>
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </>
    );
}

export default App;
