import { useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import useUserStore from '../../zustand/useUserStore';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = (props: any) => {
    const [passwordShow, setPasswordShow] = useState(false);
    const [loader, setLoader] = useState(false);
    const { loginSuccess, isLoggedIn } = useUserStore()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Geçersiz email adresi').required('Email alanı boş bırakılamaz'),
            password: Yup.string().required('Parola alanı boş bırakılamaz'),
        }),
        onSubmit: async (values) => {
            try {
                setLoader(true)
                /*  const response = await loginApi(values)
                 loginSuccess(response.data, props.router.navigate) */
            } catch (err) {
                console.log("errr ==>", err)
                setLoader(false)
            }
        },
    });

    const handlePasswordToggle = () => {
        setPasswordShow(!passwordShow);
    };

    if (isLoggedIn) {
        return <Navigate to={"/anasayfa"} />
    }

    return (
        <div className="bg-gradient-to-r from-blue-900 to-black min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl text-center text-gray-800 mb-4">Kuzem</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 outline-none border p-2"
                            placeholder="Email"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Parola</label>
                        <div className="relative">
                            <input
                                type={passwordShow ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-input mt-1 block w-full rounded-md border-gray-300 outline-none border p-2"
                                placeholder="Parola"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
                                onClick={handlePasswordToggle}
                            >
                                {passwordShow ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                        ) : null}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded"
                            disabled={loader}
                        >
                            {loader ? 'Yükleniyor...' : 'Giriş'}
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <p className="mb-0">Hesabım Yok ? <Link to="/kayit" className="font-semibold text-blue-500">Kayıt Ol</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login