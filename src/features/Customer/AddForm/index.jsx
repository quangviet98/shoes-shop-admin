import React, { useState, useContext } from 'react';
import {
    Select,
    Grid,
    FormControl,
    Input,
    InputLabel,
    FormHelperText,
    MenuItem,
    InputAdornment,
    IconButton,
    Button,
    Box
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PREFIX_URL_API } from "../../../constants/global";
import axios from "axios";
import { tokenContext } from "../../../components/Admin";



const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().required("Required").email("Invalid email format"),
    password: Yup.string().required("Required"),
    phone: Yup.string().required("Required").matches(phoneRegExp, 'Phone number is not valid'),
    address: Yup.string().required("Required")
})

function AddForm({ reload, alert, mission, customer, closeEdit }) {

    const [showPW, setShowPW] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const getToken = useContext(tokenContext);


    const initialValues = {
        name: customer.name,
        role: customer.role,
        email: customer.email,
        password: customer.password,
        phone: customer.phone,
        address: customer.address
    }
    if (mission === "add") {
        initialValues.name = "";
        initialValues.role = "admin";
        initialValues.email = "";
        initialValues.password = "";
        initialValues.phone = "";
        initialValues.address = "";
    }

    const onSubmit = (data) => {
        //console.log(data);
        setIsLoading(true);

        if (mission === "add") {
            axios.post(`${PREFIX_URL_API}/customers/signup`, data)
                .then(response => {
                    console.log(response);
                    setIsLoading(false);
                    reload();
                    alert("alert-success", "Đăng ký tài khoản thành công!");
                })
                .catch(err => {
                    console.log(err.response);
                    if (err.response.status === 409) {
                        alert("alert-danger", "Email đã được sử dụng!");
                    } else {
                        alert("alert-danger", "Đăng ký thất bại, kiểm tra kết nối!");
                    }
                    setIsLoading(false);
                })
        } else {
            axios.patch(`${PREFIX_URL_API}/customers/${customer._id}`, data, {
                headers: {
                    Authorization: `JWT ${getToken.token}`
                }
            })
                .then(response => {
                    console.log(response);
                    alert("alert-success", "Cập nhật tài khoản thành công!");
                    closeEdit();
                    setIsLoading(false);
                })
                .catch(err => {
                    alert("alert-danger", "Cập nhật tài khoản thất bại, kiểm tra kết nối!");
                    setIsLoading(false);
                })
        }

    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="container-fluid section-add-product p-5">
            <form onSubmit={formik.handleSubmit} onReset={formik.resetForm}  >
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <FormControl error={formik.errors.name && formik.touched.name && true} style={{ width: '95%' }} >
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input
                                id="name"
                                name="name"
                                variant="outlined"
                                {...formik.getFieldProps("name")}
                            />
                            {formik.errors.name && formik.touched.name && <FormHelperText>{formik.errors.name}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl style={{ width: '90%' }} >
                            <InputLabel htmlFor="role">Role</InputLabel>
                            <Select
                                id="role"
                                name="role"
                                {...formik.getFieldProps("role")}
                            >
                                <MenuItem value='admin'>Admin</MenuItem>
                                <MenuItem value='user'>User</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={7}>
                        <FormControl error={formik.errors.email && formik.touched.email && true} style={{ width: '95%' }} >
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                type="text"
                                id="email"
                                name="email"
                                {...formik.getFieldProps("email")}
                            />
                            {formik.errors.email && formik.touched.email && <FormHelperText>{formik.errors.email}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl error={formik.errors.password && formik.touched.password && true} style={{ width: '90%' }}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                type={showPW ? "text" : "password"}
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                {...formik.getFieldProps("password")}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPW(!showPW)}
                                            onMouseDown={handleMouseDownPassword}

                                        >
                                            {showPW ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {formik.errors.password && formik.touched.password && <FormHelperText>{formik.errors.password}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={7}>
                        <FormControl error={formik.errors.phone && formik.touched.phone && true} style={{ width: '95%' }} >
                            <InputLabel htmlFor="phone">Phone</InputLabel>
                            <Input
                                id="phone"
                                name="phone"
                                {...formik.getFieldProps("phone")}
                            />
                            {formik.errors.phone && formik.touched.phone && <FormHelperText>{formik.errors.phone}</FormHelperText>}

                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl error={formik.errors.address && formik.touched.address && true} style={{ width: '97%' }}>
                            <InputLabel htmlFor="address" >Address</InputLabel>
                            <Input
                                id="address"
                                name="address"
                                {...formik.getFieldProps("address")}
                            />
                            {formik.errors.address && formik.touched.address && <FormHelperText>{formik.errors.address}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item container alignItems="center" justify="center" xs={12} >
                        <Box mt={3}>
                            <Button type="submit" variant="outlined" color="primary">{mission === "add" ? "Đăng ký" : "Cập nhật"}</Button>
                            {isLoading ? (
                                <div className="spinner-signup "></div>
                            ) : null}
                        </Box>
                    </Grid>
                </Grid>

            </form>
        </div>

    )
}

export default AddForm
