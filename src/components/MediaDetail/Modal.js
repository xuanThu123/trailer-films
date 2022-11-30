import React, { useState } from 'react';
import className from 'classnames/bind';
import { CloseOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { controlPosterModal } from './mediaDetailSlice';
import styles from './MediaDetail.module.scss';

const cx = className.bind(styles);
function Modal({ colection }) {
    const dispatch = useDispatch();
    const [currPoster, setCurrPoster] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const loadingImage = () => {
        return new Promise((resolve) => {
            setIsLoading(true);
            setTimeout(() => resolve(), 2000);
        });
    };

    const handlePosterClick = () => {
        loadingImage().then(() => setIsLoading(false));

        setCurrPoster((preState) => {
            if (preState > colection?.length - 1) {
                return 0;
            }
            return preState + 1;
        });
    };

    const handlePrePoster = () => {
        loadingImage().then(() => setIsLoading(false));
        setCurrPoster((pre) => pre - 1);
    };

    const handleCloseImageModal = () => {
        document.querySelector('.poster-section').classList.remove('full-gray');
        dispatch(controlPosterModal(false));
    };

    return (
        <>
            <div className={cx('modal-wrapper','poster-section')}></div>
            <div className={cx('inner-modal', 'image-modal')}>
                <div onClick={handlePosterClick} className={cx('image-poster', 'd-flex')}>
                    {isLoading ? (
                        <img
                            className={cx('loading-icon')}
                            src="https://www.themoviedb.org/assets/2/legacy/loading-67273826e6c9796ea75b539cadbf9e8539db96d3529f8c1033fcf648bab5202e.gif"
                            alt="loading"
                        />
                    ) : (
                        <img
                            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${colection?.[currPoster]?.file_path}`}
                            alt=""
                            className={cx('poster-img')}
                        />
                    )}
                </div>
                <div className={cx('info-poster', 'd-flex')}>
                    <span className={cx('close-modal')} onClick={handleCloseImageModal}>
                        <CloseOutlined />
                    </span>
                    <div className={cx('meta')}>
                        <h3>Info</h3>
                        <form>
                            <label>Size</label>
                            <p>
                                {colection?.[currPoster]?.width}x{colection?.[currPoster]?.height}
                            </p>
                        </form>
                    </div>
                    {currPoster && (
                        <span onClick={handlePrePoster} className={cx('prev-poster')}>
                            <ArrowLeftOutlined />
                        </span>
                    )}
                    <span onClick={handlePosterClick} className={cx('next-poster')}>
                        <ArrowRightOutlined />
                    </span>
                </div>
            </div>
        </>
    );
}

export default Modal;
