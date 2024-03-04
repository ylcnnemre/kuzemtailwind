import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ICreateUserType } from "../../api/User/userType";
import { createStudentApi } from "../../api/User/userAPi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Register = () => {
    const [loader, setLoader] = useState(false);
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const eightyYearsAgo = new Date(today.getFullYear() - 80, today.getMonth(), today.getDate());

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(2, "Minimum 2 Karakter").max(50, "Maksimum 50 karakter").required("İsim Boş bırakılamaz"),
        surname: Yup.string().min(1, "Minimum 1 Karakter").max(50, "Maksimum 50 karakter").required("Soyisim boş bırakılamaz"),
        tcNo: Yup.string().min(11, "TcNo 11 karakter olmalı").max(11, "Tc No 11 Karakter Olmalı").required("Tc No boş bırakılamaz"),
        email: Yup.string().email("Email Formatı Yanlış").required("Email boş bırakılamaz"),
        password: Yup.string().min(5, "Minumum 5 Karakter").required("Parola alanı boş bırakılamaz"),
        birthDate: Yup.date().max(eighteenYearsAgo, 'You must be at least 18 years old.').min(eightyYearsAgo, 'You must be at most 80 years old.').required("Doğum Tarihi Seçiniz"),
        gender: Yup.string().oneOf(["erkek", "kadın"]).required("Seçim yapınız"),
        confirm_password: Yup.string()
            .oneOf([Yup.ref("password")], "Parola eşleşmiyor")
            .required("Lütfen Parolayı onaylayınız"),
        phone: Yup.string()
            .matches(/^(\d{10})$/, "Geçerli bir  tel No girin")
            .required("Bu alan boş bırakılamaz"),
    });

    const initialValues = {
        name: "",
        surname: "",
        tcNo: "",
        email: "",
        birthDate: "",
        password: "",
        phone: "",
        confirm_password: "",
        gender: "",
    };



    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                const { confirm_password, gender, tcNo, birthDate, ...rest } = values
                const respo: ICreateUserType = {
                    ...rest,
                    tcNo: `${tcNo}`,
                    gender: gender as ICreateUserType["gender"],
                    birthDate: new Date(birthDate).toISOString().split('T')[0],
                    role: "student"
                }
                await createStudentApi(respo)


                toast.success("Kayıt başarılı", {
                    autoClose: 1000
                })
                /*    setTimeout(() => {
                       history("/giris")
                   }, 2000) */

            }
            catch (err: any) {
                toast.error(err.response.data.message, {
                    autoClose: 2000
                })
                console.log("err ==>", err)
            }
        },
    });

    return (
        <div className="bg-gradient-to-r from-blue-900 to-black min-h-screen flex items-center justify-center">
            <div className="w-[800px] border border-[#2A4562] p-8 bg-[#05192F] rounded-lg">
                <form onSubmit={formik.handleSubmit} >
                    <div className="grid grid-cols-2 gap-6" >
                        <div className="flex flex-col">

                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="surname" className="text-white ">İsim</label>
                                {formik.touched.name && formik.errors.name ? <div className="text-[#F18275] text-xs">{formik.errors.name}</div> : null}
                            </div>
                            <input type="text" value={formik.values.name} onChange={formik.handleChange} id="name" className="w-full border border-blue-800 bg-[#061E39] text-white  outline-none p-3 rounded-lg" placeholder="isim" />

                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center mb-2 justify-between">
                                <label htmlFor="surname" className="text-white">Soyisim</label>
                                {formik.touched.surname && formik.errors.surname ? <div className="text-[#F18275] text-sm">{formik.errors.surname}</div> : null}
                            </div>

                            <input type="text" value={formik.values.surname} onChange={formik.handleChange} id="surname" className="w-full border border-blue-800 bg-[#061E39] text-white outline-none p-3 rounded-lg" placeholder="soyisim" />

                        </div>
                        <div className="flex flex-col col-span-2">
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="email" className="text-white">Email</label>
                                {formik.touched.email && formik.errors.email ? <div className="text-[#F18275] text-sm">{formik.errors.email}</div> : null}
                            </div>

                            <input type="email" onChange={formik.handleChange} value={formik.values.email} id="email" className="w-full border border-blue-800 bg-[#061E39] text-white outline-none p-3 rounded-lg" placeholder="email" />

                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="phone" className="text-white">
                                    Telefon Numarası
                                </label>
                                {formik.touched.phone && formik.errors.phone ? <div className="text-[#F18275] text-sm">{formik.errors.phone}</div> : null}
                            </div>

                            <input
                                type="number"
                                id="phone"
                                autoComplete="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                className="w-full bg-[#061E39] border border-blue-800 text-white outline-none p-3 rounded-lg"
                                placeholder="telefon"
                            />

                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="tcNo" className="text-white ">
                                    Tc No
                                </label>
                                {formik.touched.tcNo && formik.errors.tcNo ? <div className="text-[#F18275] text-sm">{formik.errors.tcNo}</div> : null}
                            </div>
                            <input
                                type="text"
                                id="tcNo"
                                name="tcNo"
                                value={formik.values.tcNo}
                                onChange={formik.handleChange}
                                autoComplete="tcNo"
                                placeholder="tc no"
                                className="w-full border border-blue-800 bg-[#061E39] text-white outline-none p-3 rounded-lg"
                            />

                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="birthDate" className="text-white">
                                    Doğum Tarihi
                                </label>
                                {formik.touched.birthDate && formik.errors.birthDate ? (
                                    <div className="text-[#F18275] text-sm">{formik.errors.birthDate}</div>
                                ) : null}
                            </div>

                            <input
                                value={formik.values.birthDate}
                                onChange={formik.handleChange}
                                type="date"
                                id="birthDate"
                                name="birthDate"
                                autoComplete="birthDate"
                                className="w-full border border-blue-800 bg-[#061E39] text-white outline-none p-[10px] rounded-lg"
                            />

                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="gender" className=" text-white ">
                                    Cinsiyet
                                </label>
                                {formik.touched.gender && formik.errors.gender ? <div className="text-[#F18275] text-sm">{formik.errors.gender}</div> : null}
                            </div>

                            <select id="gender" value={formik.values.gender} onChange={formik.handleChange} className="w-full border  border-blue-800 bg-[#061E39] text-white outline-none p-3 rounded-lg">
                                <option value="">Seçiniz</option>
                                <option value="erkek">Erkek</option>
                                <option value="kadın">Kadın</option>
                            </select>

                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="text-white">
                                    Parola
                                </label>
                                {formik.touched.password && formik.errors.password ? <div className="text-[#F18275] text-sm">{formik.errors.password}</div> : null}
                            </div>
                            <input
                                type="password"
                                id="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                autoComplete="password"
                                className="w-full border border-blue-800 bg-[#061E39] text-white outline-none p-3 rounded-lg"
                            />

                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="confirm_password" className="text-white">
                                    Parola Onay
                                </label>
                                {formik.touched.confirm_password && formik.errors.confirm_password ? (
                                    <div className="text-[#F18275] text-sm">{formik.errors.confirm_password}</div>
                                ) : null}
                            </div>

                            <input
                                type="password"
                                value={formik.values.confirm_password}
                                id="confirm_password"
                                onChange={formik.handleChange}
                                autoComplete="confirm_password"
                                className="w-full border border-blue-800 bg-[#061E39] text-white outline-none p-3 rounded-lg"
                            />

                        </div>
                        <div className="col-span-2">
                            <button className="w-full border-none rounded-lg hover:opacity-85 transition-all bg-bootstrapGreen text-white outline-none p-3 ">
                                Kayıt
                            </button>
                        </div>
                    </div>


                </form>
                <h6 className="text-center mt-2 text-white">
                    Zaten hesabım var ?  <Link to={"/giris"} className="font-bold text-blue-400 ml-2">Giriş yap</Link>
                </h6>
            </div>

        </div>
    );
};

export default Register;
