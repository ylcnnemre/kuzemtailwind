import React, { FC, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"

import { toast } from 'react-toastify'

import useUserStore from '../../../zustand/useUserStore'
import { createUserApi } from '../../../api/User/userAPi'
import { IUserData } from '../../../api/User/userType'
import { getAllBranch } from '../../../api/Branch/BranchApi'

const today = new Date();
const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
const eightyYearsAgo = new Date(today.getFullYear() - 80, today.getMonth(), today.getDate());

const AddTeacherComponent = () => {
    const { user: { _id } } = useUserStore()
    const [branchList, setBranchList] = useState<Array<{ id: string, name: string }>>([])

    useEffect(() => {
        getAllBranch().then(val => {
            setBranchList(val.data.map(item => {
                return {
                    id: item._id,
                    name: item.name
                }
            }))
        }).catch(err => {
            toast.error("Bir hata oluştu", {
                autoClose: 2000
            })
        })
    }, [])


    const formik = useFormik({
        initialValues: {
            birthDate: "",
            email: "",
            gender: "erkek",
            name: "",
            phone: "",
            surname: "",
            tcNo: "",
            branch: ""
        },
        validationSchema: yup.object({
            email: yup.string().email().required(),
            name: yup.string().required(),
            surname: yup.string().required(),
            phone: yup.string()
                .matches(/^(\d{10})$/, "Geçerli bir Türkiye telefon numarası girin") // Türkiye telefon numarası formatı (Başında 0 ve 10 rakam)
                .required("Telefon numarası boş bırakılamaz"),
            branch: yup.string().required("Branş seçimi zorunludur"),
            tcNo: yup
                .string()
                .length(11, "T.C. Kimlik Numarası 11 haneli olmalıdır.")
                .matches(/^[0-9]+$/, "T.C. Kimlik Numarası sadece rakamlardan oluşmalıdır.")
                .required("T.C. Kimlik Numarası boş bırakılamaz."),
            birthDate: yup.date().max(eighteenYearsAgo, 'You must be at least 18 years old.').min(eightyYearsAgo, 'You must be at most 80 years old.').required("Doğum Tarihi Seçiniz"),
            gender: yup.string().required()
        }),
        onSubmit: async (value, { resetForm }) => {
            try {
                const { gender, ...rest } = value
                await createUserApi({
                    ...rest,
                    gender: gender as IUserData["gender"],
                    role: "teacher",
                    userId: _id as string
                })
                toast.success("Öğretmen kayıt edildi", {
                    autoClose: 1500
                })
                resetForm()
            }
            catch (err: any) {
                console.log("err =>", err)
                toast.error(err.response.data.message, {
                    autoClose: 1500
                })
            }

        }
    })
    console.log("formik ==>=", formik.errors)
    return (
        <div className='' >
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-2 gap-x-7 gap-y-4'>

                    <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="surname" className="text-black font-bold dark:text-white ">İsim</label>
                            {formik.touched.name && formik.errors.name ? <div className="text-[#F18275] text-xs">{formik.errors.name}</div> : null}
                        </div>
                        <input type="text" value={formik.values.name} onChange={formik.handleChange} id="name" className="w-full border border-blue-800 bg-[#061E39] text-white  outline-none p-3 rounded-lg" placeholder="isim" />

                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="surname" className="text-black font-bold dark:text-white ">Soyisim</label>
                            {formik.touched.surname && formik.errors.surname ? <div className="text-[#F18275] text-xs">{formik.errors.surname}</div> : null}
                        </div>
                        <input type="text" value={formik.values.surname} onChange={formik.handleChange} id="surname" className="w-full border border-blue-800 bg-[#061E39] text-white  outline-none p-3 rounded-lg" placeholder="soyisim" />

                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="tcNo" className="text-black font-bold dark:text-white">
                                Tc No
                            </label>
                            {formik.touched.tcNo && formik.errors.tcNo ? <div className="text-[#F18275] text-sm">{formik.errors.tcNo}</div> : null}
                        </div>
                        <input
                            type="number"
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
                            <label htmlFor="birthDate" className="text-black font-bold dark:text-white">
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
                            <label htmlFor="phone" className="text-black dark:text-white">
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
                            className="w-full appearance-none bg-[#061E39] border border-blue-800 text-white outline-none p-3 rounded-lg"
                            placeholder="telefon"
                        />

                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="email" className="text-white dark:text-white font-bold">Email</label>
                            {formik.touched.email && formik.errors.email ? <div className="text-[#F18275] text-sm">{formik.errors.email}</div> : null}
                        </div>

                        <input type="email" onChange={formik.handleChange} value={formik.values.email} id="email" className="w-full border border-blue-800 bg-[#061E39] text-white outline-none p-3 rounded-lg" placeholder="email" />

                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="gender" className=" text-black dark:text-white font-bold ">
                                Cinsiyet
                            </label>
                            {formik.touched.gender && formik.errors.gender ? <div className="text-[#F18275] text-sm">{formik.errors.gender}</div> : null}
                        </div>

                        <select id="gender" value={formik.values.gender} onChange={formik.handleChange} className="w-full border  border-blue-800 bg-[#061E39] text-white outline-none p-3 rounded-lg">
                            <option value=""  >Seçiniz</option>
                            <option value="erkek">Erkek</option>
                            <option value="kadın">Kadın</option>
                        </select>

                    </div>

                    <div className="flex flex-col">
                        <div className='flex items-center justify-between mb-2'>
                            <label className="text-black dark:text-white font-bold ">
                                Branş
                            </label>
                            {formik.touched.branch && formik.errors.branch ? (
                                <div className='text-[#F18275] text-sm'>{formik.errors.branch}</div>
                            ) : null}
                        </div>

                        <select className={"w-full border  border-blue-800 bg-[#061E39] text-white outline-none p-3 rounded-lg"} value={formik.values.branch} onChange={formik.handleChange} onBlur={formik.handleBlur} name="branch" id="branch">
                            <option value="">
                                Seçim Yapınız
                            </option>
                            {
                                branchList.map((el, index) => {
                                    return (
                                        <option key={`${index}`} value={el.name}>
                                            {el.name}
                                        </option>
                                    )
                                })
                            }
                        </select>

                    </div>

                    <div className='col-span-2 flex justify-end'>
                        <button type="submit"
                            className="btn btn-primary self-end p-2 text-white rounded-lg bg-primary text">
                            Güncelle
                        </button>
                    </div>


                </div>




            </form>
        </div>

    )
}

export default AddTeacherComponent