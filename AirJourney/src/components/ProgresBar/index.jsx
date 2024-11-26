import React from 'react';

const ProgressBar = ({ children }) => {
    return (
        <div className="progress-bar bg-white py-3 shadow-sm">
            <div 
                className="d-flex justify-content-between px-4"
                style={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Shadow hanya di bawah
                    margin: "0", // Menghilangkan jarak luar
                    padding: "0", // Menghilangkan jarak dalam
                    position: "relative", // Untuk menempel di bagian atas
                    top: "0", // Pastikan posisinya di bagian atas
                    width: "100%", // Pastikan elemen menyesuaikan lebar penuh
                    flexDirection: "column", // Pastikan konten diatur secara vertikal
                    alignItems: "center", // Pusatkan konten secara horizontal
                }}
            >
                {children}
            </div>
        </div>
    );
};




export default ProgressBar;
