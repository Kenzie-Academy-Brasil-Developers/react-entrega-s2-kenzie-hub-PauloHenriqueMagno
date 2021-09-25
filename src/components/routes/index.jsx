import { Switch, Route } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { ToastContainer } from 'react-toastify'
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage"
import UserPage from "../pages/UserPage/UserPage"
import Header from "../header"
import 'react-toastify/dist/ReactToastify.css';
import login from "../services/login"
import Profile from "../pages/Profile"

export const Routes = () =>{
    const [isLogged, setIsLogged] = useState(false)
    const [User, setUser] = useState({})

    useEffect(() =>{
        const token = JSON.parse(localStorage.getItem("@KenzieHub:token"))

        if(!!token){
            login(setUser)
            setIsLogged(true)
        }
    }, [])

    return (
        <>
            <Header isLogged={isLogged} setIsLogged={setIsLogged} />
            <div className="container">
                <ToastContainer 
                    position="top-center"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Switch>
                    <Route path="/sign_in">
                        <RegisterPage />
                    </Route>
                    <Route path="/profile">
                        {isLogged?
                        <Profile
                            User={User}
                            setUser={setUser}
                        />:<></>
                        }
                    </Route>
                    <Route path="/">
                        {!isLogged?
                            <LoginPage
                                setIsLogged={setIsLogged}
                                setUser={setUser}
                                login={login}
                            />:
                            <UserPage
                                User={User}
                                setUser={setUser}
                                setIsLogged={setIsLogged}
                            />
                        }
                    </Route>
                </Switch>
            </div>
        </>
    )
}