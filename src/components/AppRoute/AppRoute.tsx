import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../../router";
import { useTypedselector } from "../../hooks/useTypedSelector";
import { FC } from "react";


const AppRoute: FC = () => {
    const { isAuth } = useTypedselector(state => state.auth);

    return (
        isAuth
                ? 
                <Routes>
                    {privateRoutes.map(route => 
                        <Route key={route.path} path={route.path} element={<route.element />}/>    
                    )}
                    <Route path="*" element={<Navigate to={'/'} replace/>}/>
                </Routes>
                : 
                <Routes>
                    {publicRoutes.map(route => 
                        <Route key={route.path} path={route.path} element={<route.element />}/>
                    )}
                    <Route path="*" element={<Navigate to={'/login'} replace/>}/>    
                </Routes>
    )
}

export default AppRoute;