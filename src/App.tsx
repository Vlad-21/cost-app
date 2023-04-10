import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRouteComponent/PrivateRouteComponent";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import './App.scss';

const App = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <Router>
        <div className="l-container">
            <Routes>
                <Route path={'/'} element={
                    <PrivateRoute isLogin={isLogin}>
                        <HomePage/>
                    </PrivateRoute>
                }/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/createUser'} element={<RegistrationPage/>}/>
            </Routes>
        </div>
    </Router>
  );
}

export default App;
