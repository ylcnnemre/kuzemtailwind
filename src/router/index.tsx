import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import useUserStore from '../zustand/useUserStore';

import { Permission } from '../common/constant';
import DefaultLayout from '../layout/DefaultLayout';
import AuthProtected from './AuthProtected';


const Index = () => {

    const { user: { role, permission } } = useUserStore()

    const permissionControl = (item: any) => {
        if (!item?.role) {
            return permission?.includes(item?.permission) || item?.permission == Permission.all
        }
        else {
            return item?.role.includes(role)
        }
    }


    return (

        <>
            <Routes>

                <Route>
                    {publicRoutes.map((route: any, idx: any) => (
                        <Route
                            path={route.path}
                            element={
                                <div>
                                    {route.component}
                                </div>
                            }
                            key={idx}
                        />
                    ))}
                </Route>

                <Route>

                      {authProtectedRoutes.map((route, idx: any) => {
                        if (permissionControl(route)) {
                            return (
                                <Route
                                    path={route.path}
                                    element={
                                        <AuthProtected>
                                            <DefaultLayout>{route.component}</DefaultLayout>
                                        </AuthProtected>}
                                    key={idx}
                                />
                            )
                        }

                    })}
                </Route>
            </Routes>

        </>


    );
};

export default Index;