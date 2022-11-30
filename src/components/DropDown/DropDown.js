import React, { memo, useEffect } from 'react';
import { Dropdown, Space, Menu } from 'antd';
import className from 'classnames/bind';
import styles from './DropDown.module.scss';
import { CaretDownOutlined } from '@ant-design/icons';

const cx = className.bind(styles);
function MyDropDown({ data, icon }) {
    useEffect(() => {
        if (document.querySelectorAll('.DropDown_space-item__Zsu7l').length < 1) return;
        document.querySelectorAll('.DropDown_space-item__Zsu7l')[0].style.borderColor =
            'rgba(var(--lightBlue), 1)';
    }, []);

    const handleSelectOption = ({ key }) => {
        console.log({ key });
        const result = data.find((item) => {
            return item.items.find((item) => {
                return item.key === key;
            });
        });
        document.querySelectorAll('.DropDown_space-item__zZhRd').forEach((elem) => {
            elem.style.borderColor = 'transparent';
            if (elem.innerText === result?.title) {
                elem.style.borderColor = 'rgba(var(--lightBlue), 1)';
            }
        });
    };

    const menu = (mu) => <Menu items={mu} onClick={handleSelectOption} />;
    return (
        <div className={cx('wrapper', 'd-flex')}>
            {data?.map((mu, index) => (
                <Dropdown key={index} overlay={menu(mu.items)}>
                    <Space className={cx('space-item')}>
                        {mu.title}
                        {icon && <CaretDownOutlined />}
                    </Space>
                </Dropdown>
            ))}
        </div>
    );
}

export default memo(MyDropDown);
