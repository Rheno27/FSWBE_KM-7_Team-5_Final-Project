import React from 'react';

const ProgressBar = ({ children }) => {
    return (
        <div className="progress-bar bg-white py-3 shadow-sm">
            <div 
                className="d-flex justify-content-between px-4"
                style={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
                    margin: "0", 
                    padding: "0", 
                    position: "relative", 
                    top: "0", 
                    width: "100%", 
                    flexDirection: "column",
                    alignItems: "center", 
                }}
            >
                {children}
            </div>
        </div>
    );
};




export default ProgressBar;
