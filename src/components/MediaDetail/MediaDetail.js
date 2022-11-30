import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import className from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Progress } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { FastAverageColor } from 'fast-average-color';

import MyDropDown from '~/components/DropDown/DropDown';
import movieApi from '~/api/movieApi';
import tvShowApi from '~/api/tvShowApi';
import { ExpandIcon } from '~/components/Icons';
import Modal from './Modal';
import TrailerModal from './TrailerModal';
import { mediaDetailSelector, trailerModalSelector } from '~/app/store/selector';
import { controlPosterModal, controlTrailerModal } from './mediaDetailSlice';
import styles from './MediaDetail.module.scss';

const cx = className.bind(styles);
const fac = new FastAverageColor();
function MediaDetail() {
    const { id } = useParams();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const refImage = useRef();

    const isShowModal = useSelector(mediaDetailSelector);
    const isShowTrailerModal = useSelector(trailerModalSelector);
    const [mediaCurrent, setMediaCurrent] = useState({});
    const [videoTrailers, setVideoTrailers] = useState([]);

    useEffect(() => {
        if (!mediaCurrent.poster_path) return;
        const url = `https://image.tmdb.org/t/p/w500${mediaCurrent?.poster_path}`;
        const corsImageModified = new Image();
        corsImageModified.crossOrigin = 'Anonymous';
        corsImageModified.src = url + '?not-from-cache-please';

        fac.getColorAsync(corsImageModified, {
            algorithms: 'dominant',
        })
            .then((color) => {
                console.log(color);
                if (refImage.current) {
                    refImage.current.style.backgroundImage = `linear-gradient(90deg, ${
                        color.rgba
                    } 150px, rgba(${color.value.slice(0, 3).join(',')},0.85))
            `;
                    refImage.current.style.color = color.isDark ? '#fff' : '#000';
                }
            })
            .catch((e) => console.log('[error]', e));
    }, [mediaCurrent, mediaCurrent?.poster_path]);

    const menusInfo = useMemo(
        () => [
            {
                title: 'Overview',
                items: [
                    { key: 'main', label: 'Main' },
                    { key: 'alternative titles', label: 'Alternative Titles' },
                    { key: 'cast & crew', label: 'Cast & Crew' },
                    { key: 'release dates', label: 'Release Dates' },
                    { key: 'translations', label: 'Translations' },
                    { key: 'changes', label: 'Changes' },
                ],
            },
            {
                title: 'Media',
                items: [
                    { key: 'backdrops ', label: 'Backdrops ' },
                    { key: 'logos ', label: 'Logos ' },
                    { key: 'Posters ', label: 'Posters ' },
                    {
                        key: 'Videos',
                        label: 'Videos',
                        children: [{ key: 'trailers', label: 'Trailers' }],
                    },
                ],
            },
            {
                title: 'Fandom',
                items: [
                    {
                        key: 'discussions ',
                        label: 'Discussions',
                        children: [
                            { key: 'overview', label: 'Overview' },
                            { key: 'general', label: 'General ' },
                            { key: 'content issues ', label: 'Content Issues' },
                        ],
                    },
                    { key: 'review ', label: 'Reviews ' },
                ],
            },
            {
                title: 'Share',
                items: [
                    { key: 'share link ', label: 'Share Link ' },
                    { key: 'facebook ', label: 'Facebook ' },
                    { key: 'tweet ', label: 'Tweet ' },
                ],
            },
        ],
        []
    );

    const params = useMemo(
        () => ({
            api_key: process.env.REACT_APP_API_KEY,
            append_to_response: 'images',
        }),
        []
    );

    useEffect(() => {
        const type = pathname.startsWith('movie', 1) ? 'movie' : 'tv';
        if (type === 'movie') {
            const fetchMovieDetail = async () => {
                const response = await movieApi.getMovieDetails(Number.parseFloat(id), params);
                setMediaCurrent(response);
            };
            fetchMovieDetail();
            return;
        }
        const fetchTvShowDetail = async () => {
            const response = await tvShowApi.getTvShowDetails(id, params);
            setMediaCurrent(response);
        };
        fetchTvShowDetail();
    }, [id, pathname, params]);

    useEffect(() => {
        const type = pathname.startsWith('movie', 1) ? 'movie' : 'tv';
        const params = {
            api_key: process.env.REACT_APP_API_KEY,
            language: 'en-US',
        };
        if (type === 'movie') {
            const fetchMovieTrailers = async () => {
                const response = await movieApi.getTrailersMovieById(Number.parseFloat(id), params);
                setVideoTrailers(response.results);
                return;
            };
            fetchMovieTrailers();
        }
    }, [id, pathname]);

    const formatReleaseDate = (date) => {
        return date?.split('-').reverse().join('/');
    };

    const renderGenres = (genres) => {
        return genres?.map((genre) => genre.name).join(', ');
    };

    const convertRuntime = (time) => {
        if (!time) return '1h';
        if (time < 60) {
            return `${time}m`;
        }
        return `${Math.floor(time / 60)}h ${time % 60 > 0 ? (time % 60) + 'm' : ''}`;
    };

    const style = useMemo(() => {
        if (!mediaCurrent?.poster_path) return;
        return {
            backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${mediaCurrent?.poster_path})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '570px',
        };
    }, [mediaCurrent?.poster_path]);

    const handleOpenModal = (action, classname) => {
        return new Promise((resolve) => {
            dispatch(action(true));
            resolve();
        }).then(() => {
            document.querySelector(`.${classname}`).classList.add('full-gray');
        });
    };

    return (
        <div className={cx('wrapper')}>
            <section className={cx('shortcut-bar')}>
                <MyDropDown data={menusInfo} icon />
            </section>
            <div className={cx('header')} style={style}>
                <div ref={refImage} className={cx('modal')}>
                    <div className={cx('single-column')}>
                        <div className={cx('image-inner')}>
                            <div className={cx('poster-wrapper')}>
                                <div
                                    className={cx('poster')}
                                    onClick={() =>
                                        handleOpenModal(
                                            controlPosterModal,
                                            'poster-section'
                                        )
                                    }
                                >
                                    <div className={cx('image-content')}>
                                        <img
                                            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${mediaCurrent?.poster_path}`}
                                            alt="poster"
                                        />

                                        <div className={cx('zoom')}>
                                            <div className={cx('no-click')}>
                                                <span className={cx('expand-icon')}>
                                                    <ExpandIcon />
                                                </span>
                                                Expand
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('header-poster', 'd-flex')}>
                                <div className={cx('title')}>
                                    <h2>
                                        {mediaCurrent?.title || mediaCurrent?.name}
                                        <span className={cx('year')}>
                                            {` (${
                                                mediaCurrent?.release_date?.split('-')[0] ||
                                                mediaCurrent?.first_air_date?.split('-')[0] ||
                                                2022
                                            })`}
                                        </span>
                                    </h2>
                                    <div className={cx('facts')}>
                                        <span className={cx('release')}>
                                            {formatReleaseDate(
                                                mediaCurrent?.release_date ||
                                                    mediaCurrent?.first_air_date
                                            )}
                                        </span>
                                        <span className={cx('genres')}>
                                            {`${renderGenres(mediaCurrent?.genres)}`}
                                        </span>
                                        <span className={cx('runtime')}>
                                            {convertRuntime(
                                                mediaCurrent?.runtime ||
                                                    mediaCurrent?.episode_run_time?.[0]
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <ul className={cx('auto-actions', 'd-flex')}>
                                    <li className={cx('chart', 'd-flex')}>
                                        <Progress
                                            className={cx('vote-average')}
                                            strokeWidth={8}
                                            type="circle"
                                            width={60}
                                            percent={Math.round(mediaCurrent?.vote_average * 10)}
                                            trailColor="#204529"
                                            strokeColor={
                                                mediaCurrent?.vote_average >= 7
                                                    ? '#21d07a'
                                                    : '#d2d531'
                                            }
                                        />
                                        <div className={cx('text')}>
                                            User <br></br>
                                            Score
                                        </div>
                                    </li>
                                    <li className={cx('video')}>
                                        <div
                                            onClick={() =>
                                                handleOpenModal(
                                                    controlTrailerModal,
                                                    'video-section'
                                                )
                                            }
                                            className={cx('play-trailer')}
                                        >
                                            <CaretRightOutlined />
                                            <p>Play Trailer</p>
                                        </div>
                                    </li>
                                </ul>
                                <div className={cx('header-info')}>
                                    <h3 className={cx('tagline')}>{mediaCurrent?.tagline}</h3>
                                    {mediaCurrent?.overview && (
                                        <h3 className={cx('overview-title')}>Overview</h3>
                                    )}
                                    <div className={cx('overview-detail')}>
                                        <p>{mediaCurrent?.overview}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isShowModal && <Modal colection={mediaCurrent?.images?.backdrops} />}
            {isShowTrailerModal && <TrailerModal trailers={videoTrailers} />}
        </div>
    );
}

export default MediaDetail;
