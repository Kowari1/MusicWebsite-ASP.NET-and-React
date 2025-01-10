import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import  Header  from './components/Header';
import  AuthModal  from './components/AuthModal';
import { AuthProvider } from './components/AuthContext';
import "./components/AuthModal.css";


export const App = () => {
    const [modalType, setModalType] = useState(null);

    const openAuthModal = (type) => {
        console.log(type);
        setModalType(type)
    };
    const closeAuthModal = () => setModalType(null);

    return (
        <AuthProvider>
            <Header openAuthModal={openAuthModal} />
            {modalType && (
                <AuthModal
                    type={modalType}
                    onClose={closeAuthModal}
                    switchTo={setModalType}
                />
            )}
            <main>{
                <Layout>
                    <Routes>
                        {AppRoutes.map((route, index) => {
                            const { element, ...rest } = route;
                            return <Route key={index} {...rest} element={element} />;
                        })}
                    </Routes>                   
                </Layout>
            }</main>
        </AuthProvider>
    );
};

export default App;
