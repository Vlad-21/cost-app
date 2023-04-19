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
import {isAuth} from "./services/userService";

const App = () => {
    const [isLogin, setIsLogin] = useState<boolean>(isAuth());
    const handleLogin = (checkLogin: boolean):void => {
        setIsLogin(checkLogin);
    }
  return (
    <Router>
        <div className="l-container">
            <Routes>
                <Route path={'/'} element={
                    <PrivateRoute isLogin={isLogin}>
                        <HomePage changeLogin={handleLogin}/>
                    </PrivateRoute>
                }/>
                <Route path={'/*'} element={
                    <PrivateRoute isLogin={isLogin}>
                        <HomePage changeLogin={handleLogin}/>
                    </PrivateRoute>
                }/>
                <Route path={'/login'} element={<LoginPage isLogin={isLogin} changeLogin={handleLogin}/>}/>
                <Route path={'/registration'} element={<RegistrationPage isLogin={isLogin} />}/>
            </Routes>
        </div>
    </Router>
  );
}

export default App;
