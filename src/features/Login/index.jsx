import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "./login.scss"
import { PREFIX_URL_API } from '../../constants/global';
const initialValues = {
    email: "",
    password: ""
}


const validationSchema = Yup.object().shape({
    email: Yup.string().required('Required!').email('Invalid email format!'),
    password: Yup.string().required('Required!')
})

const initialToken = () => {
    return JSON.parse(localStorage.getItem("token"));
}

function Login(props) {
    const [token, setToken] = useState(initialToken);
    const [err, setErr] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    // const [redirectToReffer, setRedirectToReffer] = useState(false); 
    const from = props.location.state || { from: { pathname: 'admin/orders' } };
    //console.log(from);


    const onSubmit = (values) => {
        setIsLoading(true);
        setErr("");
        //console.log('data: ', values);
        axios.post(`${PREFIX_URL_API}/customers/signin`, values)
            .then(response => {
                if (response.data.customer.role === "admin") {
                    //console.log(response.data.customer);
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                    setIsLoading(false);
                    setToken(response.data.token);

                } else {
                    setErr("Người dùng không có quyền truy cập!");
                    setIsLoading(false);
                }

            })
            .catch(err => {
                if (err.response.status === 500) {
                    setErr(err.response.statusText);
                } else {
                    setErr("Wrong email or password!");
                }

                setIsLoading(false);
            })

    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    if (token) {
        return <Redirect to={from.from.pathname} />
    }

    return (

        <div className="app flex-row align-items-center card--mt-100">
            <Container>
                <Row className="justify-content-center">
                    <Col md="6">
                        <CardGroup>
                            <Card className="p-4">
                                <CardBody>
                                    <Form onSubmit={formik.handleSubmit}>
                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In to your account</p>
                                        <InputGroup className="input-gr">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Email" autoComplete="email"
                                                name="email"
                                                {...formik.getFieldProps("email")} />
                                            {formik.errors.email && formik.touched.email && <div className="err-message">{formik.errors.email}</div>}

                                        </InputGroup>
                                        <InputGroup className="input-gr">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Password" autoComplete="current-password"
                                                name="password"
                                                {...formik.getFieldProps("password")} />
                                            {formik.errors.password && formik.touched.password && <div className="err-message">{formik.errors.password}</div>}
                                        </InputGroup>
                                        <Row>
                                            <Col xs="3">
                                                <Button type="submit" color="primary" className="px-4">Login</Button>
                                            </Col>
                                            {isLoading ? (
                                                <div className="loader"></div>
                                            ) : null}
                                            {err ? <div className="err-login">{err}</div> : null}
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>

                        </CardGroup>
                    </Col>
                </Row>
            </Container>

        </div>

    )
}


export default Login
