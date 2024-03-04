import React, { useEffect, useMemo, useState } from 'react'
import useLayoutStore from '../../../zustand/useLayoutStore'
import { toast } from 'react-toastify'
import { getUserByIdApi, updateUserApi } from '../../../api/User/userAPi'
import { getAllBranch } from '../../../api/Branch/BranchApi'
import { useNavigate, useParams } from 'react-router-dom'
import { IUserData } from '../../../api/User/userType'
import { cityList } from '../../../common/city'
import { useFormik } from 'formik'
import * as yup from "yup"
import { CircleLoader, DotLoader, PropagateLoader } from 'react-spinners'
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react'
import EditTeacherInfoForm from './EditTeacherInfoForm'






const EditTeacherPage = () => {

  const data = [
    {
      label: "Bilgiler",
      value: "info",
      desc: <EditTeacherInfoForm />,
    },
    {
      label: "Sorumlu Olduğu Kurslar",
      value: "course",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
  ];
  return (
    <>
      <Tabs value="info">
        <TabsHeader className='bg-transparent' >
          {data.map(({ label, value }) => (
            <Tab className='dark:text-blue-700 text-black' key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
      {/*  <Nav tabs>
        <NavItem>
          <NavLink
            className={`${activeTab == 1 && "active"}`}
            onClick={() => {
              setActiveTab(1)
            }}
          >
            Bilgiler
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={`${activeTab == 2 && "active"}`}
            onClick={() => {
              setActiveTab(2)
            }}
          >
            Sorumlu Olduğu Kurslar
          </NavLink>
        </NavItem>

      </Nav>
      <TabContent activeTab={activeTab} style={{ paddingTop: "20px" }} className="tab_content" >
        <TabPane tabId={1}>
          < Form onSubmit={formik.handleSubmit} >
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="firstnameInput" className="form-label">
                    {t("FirstName")}
                  </Label>
                  <Input type="text" className="form-control" id="name" name='name'
                    value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    invalid={
                      formik.touched.name && formik.errors.name ? true : false
                    }
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <FormFeedback type="invalid"><div>{formik.errors.name}</div></FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="lastnameInput" className="form-label">
                    {t("LastName")}
                  </Label>
                  <Input type="text" className="form-control" id="surname"
                    placeholder="Soyadı" name='surname' value={formik.values.surname} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    invalid={
                      formik.touched.surname && formik.errors.name ? true : false
                    }
                  />
                  {formik.touched.surname && formik.errors.surname ? (
                    <FormFeedback type="invalid"><div>{formik.errors.surname}</div></FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="phonenumberInput" className="form-label">
                    Tc No
                  </Label>
                  <Input type="text" className="form-control disabled-input"
                    value={formik.values.tcNo}
                    disabled
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="phonenumberInput" className="form-label">
                    {t("BirthDate")}
                  </Label>
                  <Input
                    name="birthDate"
                    type="date"
                    placeholde1r="Doğum Tarihi"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.birthDate}
                    invalid={
                      formik.touched.birthDate && formik.errors.birthDate ? true : false
                    }
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="phonenumberInput" className="form-label">
                    {t("Phone")}
                  </Label>
                  <Input type="text" className="form-control disabled-input"
                    disabled
                    id="phone"
                    name='phone'
                    value={formik.values.phone}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="emailInput" className="form-label ">Email</Label>
                  <Input type="email" className="form-control disabled-input"
                    name='email'
                    value={formik.values.email}
                  />
                </div>
              </Col>

              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="emailInput" className="form-label">
                    {t("Gender")}
                  </Label>
                  <select className='form-control' value={formik.values.gender} name='gender' onChange={formik.handleChange} onBlur={formik.handleBlur} >
                    <option value="erkek">
                      {t("Male")}
                    </option>
                    <option value="kadın">
                      {t("Female")}
                    </option>
                  </select>
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="emailInput" className="form-label">
                    {t("Role")}
                  </Label>
                  <Input type="text" className="form-control disabled-input"
                    name='role'
                    value={formik.values.role}
                    disabled
                  />
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="emailInput" className="form-label">
                    {t("Branş")}
                  </Label>
                  <select className='form-control' name="branch" id="branch" onChange={formik.handleChange} value={formik.values.branch} >
                    {
                      branchList.map(item => {
                        return (
                          <option key={`${item}`} value={item}> {item} </option>
                        )
                      })
                    }

                  </select>

                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="city" className="form-label">
                    {t("City")}
                  </Label>
                  <select name="city" id="city" className='form-control' value={formik.values.city} onChange={(event) => {
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
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="region" className="form-label">
                    {t("Region")}
                  </Label>
                  <select name="region" id="region" onChange={formik.handleChange} className='form-control' value={formik.values.region} onBlur={formik.handleBlur}  >
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
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="region" className={`form-label`}  >
                    {t("PostalCode")}
                  </Label>
                  <Input type="number" className={`form-control ${postalCodeDisableControl ? "disabled-input" : ""}  `}
                    name='postalCode'
                    disabled={postalCodeDisableControl}
                    value={formik.values.postalCode}
                    onChange={formik.handleChange}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <button type="submit"
                    className="btn btn-primary">
                    {t("Update")}
                  </button>
                  <button type="button"
                    className="btn btn-soft-danger">
                    {t("Cancel")}
                  </button>
                </div>
              </Col>



            </Row>
          </Form >
        </TabPane>
        <TabPane tabId={2}>
          <EditTeacherResponseCourseTable data={tableData as IUserData} />
        </TabPane>
      </TabContent>
 */}
    </>


  )

}

export default EditTeacherPage