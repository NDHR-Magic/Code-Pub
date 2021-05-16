import React from 'react';
import "./style.css";

const LoadingScreen = () => {
    return (
        <div className="loading">
            <i className="fa fa-spinner fa-spin"></i> Loading...
        </div>
    );
};

export default LoadingScreen;