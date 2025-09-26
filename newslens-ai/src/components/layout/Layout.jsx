import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
            <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <Header />
                <main>
                    {children}
                </main>
                <Footer />

                <style jsx>{`
          .trending-card {
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .trending-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 15px 35px rgba(0,0,0,0.2) !important;
          }
          .overflow-auto::-webkit-scrollbar {
            display: none;
          }
          @media (max-width: 576px) {
            .display-4 {
              font-size: 2rem;
            }
            .card-body {
              padding: 1rem !important;
            }
          }
          .bg-opacity-75 {
            background-color: rgba(0,0,0,0.75) !important;
          }
        `}</style>
            </div>
        </>
    );
}