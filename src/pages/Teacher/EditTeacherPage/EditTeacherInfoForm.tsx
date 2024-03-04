import React, { useEffect, useMemo, useState } from 'react'
import { PropagateLoader } from 'react-spinners'
import { getUserByIdApi, updateUserApi } from '../../../api/User/userAPi'
import { useNavigate, useParams } from 'react-router-dom'
import { IUserData } from '../../../api/User/userType'
import { cityList } from '../../../common/city'
import { toast } from 'react-toastify'
import { getAllBranch } from '../../../api/Branch/BranchApi'
import useLayoutStore from '../../../zustand/useLayoutStore'
import { useFormik } from 'formik'
import * as yup from "yup"



const today = new Date();
const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
const eightyYearsAgo = new Date(today.getFullYear() - 80, today.getMonth(), today.getDate());

const EditTeacherInfoForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [region, setRegion] = useState<Array<string>>([])
    const [branchList, setBranchList] = useState<string[]>([])
    const [activeTab, setActiveTab] = useState(1);
    const [tableData, setTableData] = useState<IUserData>()
    const setTeacherProfileData = async (data: IUserData) => {
        try {
            console.log("dataa ==> ", data)
            const { profileImg, birthDate, branch, responsibleCourse, ...rest } = data
            Object.entries(rest).map(([key, val]) => {
                if (key != "address") {
                    formik.setFieldValue(key, val)
                }
                else {
                    const address: any = val
                    formik.setFieldValue("city", address.city)
                    formik.setFieldValue("postalCode", address.postalCode)
                    if (address.city !== "") {
                        setRegion(cityList.find(item => item.state == address.city)?.region as string[])
                        formik.setFieldValue("region", address.region)
                    }
                }
            })
            const formatBirthDate = new Date(birthDate).toISOString().split('T')[0];
            formik.setFieldValue('birthDate', formatBirthDate);
            formik.setFieldValue("branch", branch?.name)
        }
        catch (err: any) {
            toast.error(err.response.data.message)
        }
    }

    const apiRequest = async () => {
        try {
            setLoading(true)
            const responseTeacher = await getUserByIdApi(id as string)
            console.log("rea =>", responseTeacher)
            setTeacherProfileData(responseTeacher.data)
            setTableData(responseTeacher.data)
            const responseBranch = await getAllBranch()
            setBranchList(responseBranch.data.map(item => item.name))
        }
        catch (err: any) {
            toast.error(err.response.data.message, {
                autoClose: 1000
            })
            navigate("/egitmen")
        }
        finally {
            setLoading(false)
        }
    }

    const { setTitle } = useLayoutStore()

    useEffect(() => {
        setTitle("Eğitmen Güncelle")
    }, [])

    useEffect(() => {
        apiRequest()
    }, [id])


    const formik = useFormik({
        initialValues: {
            _id: "",
            birthDate: "",
            email: "",
            gender: "erkek",
            name: "",
            phone: "",
            role: "student",
            branch: "",
            surname: "",
            tcNo: "",
            city: "",
            region: "",
            courses: [],
            postalCode: 0,
            permission: []
        },
        validationSchema: yup.object({
            email: yup.string().email().required(),
            name: yup.string().required(),
            surname: yup.string().required(),
            phone: yup.string().required(),
            branch: yup.string().required("Branş Seçilmeli"),
            birthDate: yup.date().max(eighteenYearsAgo, 'You must be at least 18 years old.').min(eightyYearsAgo, 'You must be at most 80 years old.').required("Doğum Tarihi Seçiniz"),

        }),
        onSubmit: async (value) => {
            try {
                const { city, region, postalCode, email, phone, tcNo, role, courses, permission, ...rest } = value
                console.log("vall =>", value)
                let response = await updateUserApi({
                    ...rest,
                    address: {
                        city,
                        region,
                        postalCode,
                        additionalInfo: ""
                    }
                })
                toast.success("güncelleme başarılı", {
                    autoClose: 1500
                })
            }
            catch (err: any) {
                console.log("err =>>", err)
                toast.error(err.response.data.message, {
                    autoClose: 1500
                })
            }
        }
    })

    const postalCodeDisableControl = useMemo(() => {
        return formik.values.city == "" || formik.values.region == ""
    }, [formik.values.city, formik.values.region])


    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }} >
                <PropagateLoader color="#36d7b7" />
            </div>
        )
    }
    return (
        < form onSubmit={formik.handleSubmit} className='mt-4' >
            <div className='grid grid-cols-2 gap-x-7 gap-y-4' >

                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="surname" className="text-black font-bold dark:text-white text-xs ">İsim</label>
                        {formik.touched.name && formik.errors.name ? <div className="text-[#F18275] text-xs">{formik.errors.name}</div> : null}
                    </div>
                    <input type="text" value={formik.values.name} onChange={formik.handleChange} id="name" className="w-full border border-blue-800 bg-[#061E39] text-white  outline-none p-2 rounded-md" placeholder="isim" />

                </div>


                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="surname" className="text-black font-bold dark:text-white  text-xs ">Soyisim</label>
                        {formik.touched.surname && formik.errors.surname ? <div className="text-[#F18275] text-xs">{formik.errors.surname}</div> : null}
                    </div>
                    <input type="text" value={formik.values.surname} onChange={formik.handleChange} id="surname" className="w-full border border-blue-800 bg-[#061E39] text-white  outline-none p-2 rounded-lg" placeholder="soyisim" />

                </div>

                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="tcNo" className="text-black font-bold dark:text-white  text-xs">
                            Tc No
                        </label>
                        {formik.touched.tcNo && formik.errors.tcNo ? <div className="text-[#F18275] text-xs">{formik.errors.tcNo}</div> : null}
                    </div>
                    <input
                        type="number"
                        id="tcNo"
                        name="tcNo"
                        value={formik.values.tcNo}
                        onChange={formik.handleChange}
                        autoComplete="tcNo"
                        placeholder="tc no"
                        className="w-full border border-blue-800 bg-[#061E39] text-white outline-none p-2 rounded-lg"
                    />

                </div>

                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="birthDate" className="text-black font-bold dark:text-white  text-xs">
                            Doğum Tarihi
                        </label>
                        {formik.touched.birthDate && formik.errors.birthDate ? (
                            <div className="text-[#F18275] text-xs">{formik.errors.birthDate}</div>
                        ) : null}
                    </div>

                    <input
                        value={formik.values.birthDate}
                        onChange={formik.handleChange}
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        autoComplete="birthDate"
                        className="w-full border border-blue-800 bg-[#061E39] text-white outline-none p-[7px] rounded-lg"
                    />

                </div>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="phone" className="text-black dark:text-white  text-xs">
                            Telefon Numarası
                        </label>
                        {formik.touched.phone && formik.errors.phone ? <div className="text-[#F18275] text-xs">{formik.errors.phone}</div> : null}
                    </div>

                    <input
                        type="number"
                        id="phone"
                        autoComplete="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        className="w-full appearance-none bg-[#061E39] border border-blue-800 text-white outline-none p-2 rounded-lg"
                        placeholder="telefon"
                    />

                </div>

                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="email" className="text-white dark:text-white font-bold  text-xs">Email</label>
                        {formik.touched.email && formik.errors.email ? <div className="text-[#F18275] text-xs">{formik.errors.email}</div> : null}
                    </div>

                    <input type="email" onChange={formik.handleChange} value={formik.values.email} id="email" className="w-full border border-blue-800 bg-[#061E39] text-white outline-none p-2 rounded-lg" placeholder="email" />

                </div>
                <div className='grid col-span-2 gap-x-5 gap-y-5 grid-cols-3'>
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="gender" className=" text-black dark:text-white font-bold text-xs  ">
                                Cinsiyet
                            </label>
                            {formik.touched.gender && formik.errors.gender ? <div className="text-[#F18275] text-sm">{formik.errors.gender}</div> : null}
                        </div>

                        <select id="gender" value={formik.values.gender} onChange={formik.handleChange} className="w-full border   border-blue-800 bg-[#061E39] text-white outline-none p-2 rounded-lg">
                            <option value="erkek">Erkek</option>
                            <option value="kadın">Kadın</option>
                        </select>

                    </div>

                    <div className="flex flex-col">
                        <div className='flex items-center justify-between mb-2'>
                            <label className="text-black dark:text-white font-bold text-xs ">
                                Rol
                            </label>

                        </div>
                        <input
                            type="text"
                            readOnly
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            className="w-full appearance-none px-3 bg-[#061E39] border border-blue-800 text-white outline-none p-1 rounded-lg"
                            placeholder="telefon"
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className='flex items-center justify-between mb-2'>
                            <label className="text-black dark:text-white font-bold text-xs ">
                                Branş
                            </label>
                            {formik.touched.branch && formik.errors.branch ? (
                                <div className='text-[#F18275] text-sm'>{formik.errors.branch}</div>
                            ) : null}
                        </div>


                        <select className='w-full border  border-blue-800 bg-[#061E39] text-white outline-none p-2 rounded-lg' name="branch" id="branch" onChange={formik.handleChange} value={formik.values.branch} >
                            {
                                branchList.map(item => {
                                    return (
                                        <option key={`${item}`} value={item}> {item} </option>
                                    )
                                })
                            }

                        </select>



                    </div>
                    <div className="mb-3">
                        <div className='flex items-center justify-between mb-2'>
                            <label className="text-black dark:text-white font-bold text-xs ">
                                Şehir
                            </label>
                        </div>

                        <select name="city" id="city" className='w-full border  border-blue-800 bg-[#061E39] text-white outline-none p-2 rounded-lg' value={formik.values.city} onChange={(event) => {
                            if (event.target.value !== "") {
                                setRegion(cityList.find(item => item.state == event.target.value)?.region as string[])
                                formik.setFieldValue("region", "")
                                formik.handleChange(event)
                            }
                            else {
                                formik.handleChange(event)
                                formik.setFieldValue("region", "")
                            }
                        }} >
                            <option value="">
                                Seçim
                            </option>
                            {
                                cityList.map((item, index) => {
                                    return (
                                        <option key={`${index}`} value={item.state}  >
                                            {item.state}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>


                    <div className="mb-3">
                        <div className='flex items-center justify-between mb-2'>
                            <label className="text-black dark:text-white font-bold text-xs ">
                                ilçe
                            </label>
                        </div>
                        <select name="region" id="region" onChange={formik.handleChange} className='w-full border  border-blue-800 bg-[#061E39] text-white outline-none p-2 rounded-lg' value={formik.values.region} onBlur={formik.handleBlur}  >
                            <option value="">
                                Seçim
                            </option>
                            {
                                region.map((item, index) => {
                                    return (
                                        <option key={`${index}`} value={item}>
                                            {item}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>


                    <div className="mb-3">
                        <div className='flex items-center justify-between mb-2'>
                            <label className="text-black dark:text-white font-bold text-xs ">
                                Posta Kodu
                            </label>
                        </div>
                        <input type="number" className={`w-full appearance-none px-2  bg-[#061E39] border border-blue-800 text-white outline-none p-1 rounded-lg`}
                            name='postalCode'
                            disabled={postalCodeDisableControl}
                            value={formik.values.postalCode}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>




                <div className="flex justify-end col-span-2">
                    <button type="submit"
                        className=" bg-primary text-white rounded-lg px-3 py-2">
                        Güncelle
                    </button>

                </div>



            </div>
        </form >
    )
}

export default EditTeacherInfoForm