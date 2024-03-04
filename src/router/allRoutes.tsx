import { Navigate } from "react-router-dom";
import { Permission } from "../common/constant";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import SignUp from "../pages/Authentication/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddTeacherComponent from "../pages/Teacher/AddTeacherComponent/AddTeacherComponent";
import TeacherDashboard from "../pages/Teacher/TeacherDasboard";
import EditTeacherPage from "../pages/Teacher/EditTeacherPage/EditTeacherPage";



type role = "admin" | "student" | "teacher" | "superadmin"

const authProtectedRoutes: Array<{ path: string, component: React.ReactNode, exact?: boolean, permission: Permission, role?: role[] }> = [
    { path: "/panel/anasayfa", component: <Dashboard />, permission: Permission.all },
    { path: "/panel/egitmen", component: <TeacherDashboard />, permission: Permission.all, exact: true },
    {
        path: "/panel/egitmen/ekle", component: <AddTeacherComponent />, permission: Permission.all
    },
    {
        path: "/panel/egitmen/duzenle/:id", component: <EditTeacherPage />, permission: Permission.all,
    },
    { path: "*", component: <Navigate to="/panel/anasayfa" />, permission: Permission.all },
];




const publicRoutes = [
    { path: "/giris", component: <Login /> },
    /*  { path: "/forgot-password", component: <SignUp /> }, */
    { path: "/kayit", component: <Register /> },

];

export { publicRoutes, authProtectedRoutes };
