import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
/* import "./index.scss" */
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { getUserByRoleApi } from '../../api/User/Teacher/TeacherApi'
import { ITeacherType } from '../../api/User/Teacher/teacherType'
import { deleteUserApi } from '../../api/User/userAPi'
import { toast } from 'react-toastify'
import useUserStore from '../../zustand/useUserStore'
import { Permission } from '../../common/constant'


const TeacherDashboard = () => {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [teacher, setTeachers] = useState<ITeacherType[]>([])
    const [deleteModal, setDeleteModal] = useState<{
        show: boolean,
        id: string
    }>()
    const navigate = useNavigate()
    const { user: { permission } } = useUserStore()
    const getAllTeacher = async () => {
        const response = await getUserByRoleApi("teacher")
        console.log("responseTeacher ==>", response)
        setTeachers(response.data)
    }

    useEffect(() => {
        getAllTeacher()
    }, [])


    const editTeacher = (id: string) => {
        navigate(`/egitmen/duzenle/${id}`)
    }


    const deleteTeacher = async (id: string) => {
        try {
            const response = await deleteUserApi(id)
            console.log("iddd ==>", id)
            console.log("teacher ==>", teacher)
            setTeachers(teacher.filter(el => el._id !== id))
            toast.success("Eğitmen silindi", {
                autoClose: 1000
            })
        }
        catch (err: any) {
            toast.error(err.response.data.message, {
                autoClose: 1000
            })
        }
    }


    const columns = useMemo<ColumnDef<any>[]>(() => {
        return [
            {
                id: "name",
                accessorKey: "name",
                header: "İsim",
            },
            {
                id: "surname",
                accessorKey: "surname",
                header: "Soyisim"
            },
            {
                id: "email",
                accessorKey: "email",
                header: "Email",
            },
            {
                id: "phone",
                accessorKey: "phone",
                header: "Telefon"
            },
            {
                id: "branch",
                accessorKey: "branch",
                header: "Branş"
            },
            {
                id: "actions",
                accessorKey: "id",
                header: "Action",
                cell: function render({ getValue }) {
                    return (
                        <div>
                            {
                                permission.includes(Permission.TEACHER_EDIT) && (
                                    <button color="warning" className='bg-warning px-2 py-2 text-white hover:opacity-80 transition-all rounded-md' onClick={() => {
                                        navigate(`/panel/egitmen/duzenle/${getValue()}`)

                                    }} >
                                        Düzenle
                                    </button>
                                )
                            }
                            {
                                permission.includes(Permission.TEACHER_DELETE) && (
                                    <button className='bg-danger px-4 py-2 text-white hover:opacity-80 transition-all rounded-lg ml-2' onClick={() => {
                                        setDeleteModal({
                                            show: true,
                                            id: getValue() as string
                                        })
                                    }} >
                                        Sil
                                    </button>
                                )
                            }
                        </div>
                    )
                }
            }
        ]
    }, [teacher])

    const data = useMemo(() => {
        return teacher.map(item => {
            return {
                id: item._id,
                name: item.name,
                surname: item.surname,
                email: item.email,
                phone: item.phone,
                branch: item.branch?.name
            }
        })

    }, [teacher])

    const tableData = useReactTable({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            columnFilters,
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize: 8
            }
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

    return (
        <div className="">

            <div>
                {/*  <Modal isOpen={deleteModal?.show} toggle={() => {
                    setDeleteModal({
                        show: false,
                        id: deleteModal?.id ?? ""
                    })
                }} >
                    <ModalHeader toggle={() => {
                        setDeleteModal({
                            show: false,
                            id: deleteModal?.id ?? ""
                        })
                    }}>Onay</ModalHeader>
                    <ModalBody>
                        <h5>
                            Silmek istediğinize emin misiniz ?
                        </h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => {
                            deleteTeacher(deleteModal?.id as string)
                        }} >
                            Sil
                        </Button>{' '}
                        <Button color="secondary" onClick={() => {
                            setDeleteModal({
                                id: "",
                                show: false
                            })
                        }} >
                            Vazgeç
                        </Button>
                    </ModalFooter>
                </Modal> */}
            </div>


            <div className={`flex justify-between items-center mb-2  ${permission.includes(Permission.TEACHER_ADD) ? "" : null}`} >

                <input placeholder="ara" className="form-control bg-black py-2 outline-none border rounded-lg px-2 border-blue-900" style={{ width: "max-content" }} onChange={e => {
                    setGlobalFilter(e.target.value)
                }} />
                {
                    permission.includes(Permission.TEACHER_ADD) && (
                        <div className="col-sm-auto ms-auto">
                            <button
                                onClick={()=>{
                                    navigate("/panel/egitmen/ekle")
                                }}
                                className="bg-primary py-2 px-5 hover:opacity-70 transition-all rounded-md text-white"
                            >
                                Eğitmen Ekle
                            </button>
                        </div>
                    )
                }
            </div>
            <div className="">
                <table className="w-full ">
                    <thead className="bg-[#041324] ">
                        {tableData.getHeaderGroups().map((headerGroup: any) => (
                            <tr key={headerGroup.id} className='p-4'>
                                {headerGroup.headers.map((header: any) => (
                                    <th key={header.id} className='p-2 text-white text-start'   {...{
                                        onClick: header.column.getToggleSortingHandler(),
                                    }}>
                                        {header.isPlaceholder ? null : (
                                            <React.Fragment>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: ' ',
                                                    desc: ' ',
                                                }
                                                [header.column.getIsSorted() as string] ?? null}

                                            </React.Fragment>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {tableData.getRowModel().rows.map((row: any) => {
                            return (
                                <tr key={row.id} className='hover:bg-[#041324] transition-all hover:cursor-pointer ' >
                                    {row.getVisibleCells().map((cell: any) => {
                                        return (
                                            <td key={cell.id} className='py-2'>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>


        </div>

    )
}

export default TeacherDashboard

/* 12345*Abcd */

/* wget -qO- https://ubuntu.bigbluebutton.org/bbb-install-2.5.sh | sudo bash -s -- -v focal-250 -s 164.90.185.42 -e yalcnnemre@gmail.com  -a -w -g */