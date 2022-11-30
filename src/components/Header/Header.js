import { Avatar, Button, Dropdown, Menu, Space } from 'antd';
import className from 'classnames/bind';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logout } from '~/app/auth/authSlice';
import { searchBoxSelector } from '~/app/store/selector';
import { CloseIcon, LogoIcon, SearchIcon } from '~/components/Icons';
import SearchFeature from '~/components/SearchFeature/SearchFeature';
import { controlSearchBox } from '~/components/SearchFeature/searchSlice';
import { auth } from '~/firebase/config';
import styles from './Header.module.scss';

const cx = className.bind(styles);

const renderMenu = (menu) => {
    return (
        <Menu
            items={menu.map((muItem) => ({
                key: muItem.key,
                label: (
                    <Link key={muItem.key} to={muItem.path}>
                        {muItem.label}
                    </Link>
                ),
            }))}
        />
    );
};

const menu = {
    movies: [
        { key: 'mv-Popular', label: 'Popular', path: '/movie' },
        { key: 'mv-Now_Playing', label: 'Now Playing', path: '/movie/now-playing' },
        { key: 'mv-Upcoming', label: 'Upcoming', path: '/movie/upcoming' },
        { key: 'mv-Top_Rated', label: 'Top Rated', path: '/movie/top-rated' },
    ],
    tvShows: [
        { key: 'tv-Popular', label: 'Popular', path: '/tv' },
        { key: 'tv-Airing_Today', label: 'Airing Today', path: '/tv/airing-today' },
        { key: 'tv-On_TV', label: 'On TV', path: '/tv/on-the-air' },
        { key: 'tv-Top_Rated', label: 'Top Rated', path: '/tv/top-rated' },
    ],
};

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSearch = useSelector(searchBoxSelector);
    const [userInfo, setUserInfo] = useState(null);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(logout);
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    const personalMenu = (
        <Menu
            items={[
                {
                    key: 'displayName',
                    label: userInfo?.displayName,
                },
                { key: 'logout', label: <span onClick={handleLogout}>Logout</span> },
            ]}
        />
    );

    useEffect(() => {
        const currUser = auth.currentUser;
        setUserInfo({
            displayName: currUser?.displayName,
            photoURL: currUser?.photoURL,
        });
    }, []);
    
    

    return (
        <div className={cx('wrapper', 'd-flex')}>
            <Link to="/" style={{ display: 'flex' }}>
                <LogoIcon />
            </Link>
            <Space className={cx('navigate')} direction="row">
                <Dropdown overlay={renderMenu(menu.movies)} placement="bottomLeft">
                    <Button className={cx('nav-item')} type="text">
                        Movies
                    </Button>
                </Dropdown>
                <Dropdown overlay={renderMenu(menu.tvShows)} placement="bottomLeft">
                    <Button className={cx('nav-item')} type="text">
                        TV Shows
                    </Button>
                </Dropdown>
                {isSearch ? (
                    <Button
                        type="text"
                        className={cx('search-btn')}
                        icon={
                            <CloseIcon
                                onClick={() => {
                                    dispatch(controlSearchBox(false));
                                }}
                            />
                        }
                    ></Button>
                ) : (
                    <Button
                        type="text"
                        className={cx('search-btn')}
                        icon={
                            <SearchIcon
                                onClick={() => {
                                    dispatch(controlSearchBox(true));
                                }}
                            />
                        }
                    ></Button>
                )}
                {/* <Button onClick={handleLogout}>Logout</Button> */}
                <Dropdown overlay={personalMenu} placement="bottomLeft" trigger={['click']}>
                    <Avatar
                        style={{ cursor: 'pointer' }}
                        src={userInfo?.photoURL && userInfo.photoURL }
                    >
                        {userInfo?.photoURL ? '' : userInfo?.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                </Dropdown>
            </Space>
            {isSearch && <SearchFeature />}
        </div>
    );
}

export default Header;
