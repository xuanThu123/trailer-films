import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { tokenSelector } from '~/app/store/selector';

function ProtectedPage({ children }) {
    const token = useSelector(tokenSelector);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedPage;
