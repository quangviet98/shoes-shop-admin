import React from 'react'
import "./style.scss";

// <div className="loading-page__spinner"></div>
function LoadingPage() {
    return (
        <div className="loading-page">

            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default LoadingPage
