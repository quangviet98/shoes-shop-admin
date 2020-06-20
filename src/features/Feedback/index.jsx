import React, { useState, useEffect } from 'react';
import {
    Table,
    Card,
    CardHeader,
    CardBody,
    InputGroup,
    Input,
    InputGroupAddon,
    Button,
    Alert
} from 'reactstrap';
import { PREFIX_URL_API } from "../../constants/global";
import axios from 'axios';
import DataRow from './DataRow';
import Pagination from '../../components/Pagination';
import "./style.scss";
import LoadingPage from '../../components/LoadingPage';
import { CSSTransition } from 'react-transition-group';


function Feedback() {
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const limitPerPage = 6;
    const [dataCurrentPage, setDataCurrentPage] = useState([]);
    const [alert, setAlert] = useState({
        isAlert: false,
        color: "",
        message: ""
    })

    useEffect(() => {
        setIsLoading(true);
        const token = JSON.parse(localStorage.getItem("token"));

        axios.get(`${PREFIX_URL_API}/feedbacks/currentPage=${currentPage}&limitPerPage=${limitPerPage}`, {
            headers: {
                Authorization: "JWT " + token
            }
        })
            .then(response => {
                //console.log(response);
                setTotalItems(response.data.totalItems);
                setDataCurrentPage(response.data.data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                //console.log(err);
            })
    }, [currentPage, isReload])

    //console.log(data);
    // const lastIndex = currentPage * limitPerPage;
    // const firstIndex = lastIndex - limitPerPage;
    // const dataCurrent = data.slice(firstIndex, lastIndex);

    const changePage = (page) => {
        //console.log({ page });
        setCurrentPage(page);
    }

    const onReloadDelete = () => {
        const lastPage = Math.ceil(totalItems / limitPerPage);
        if (lastPage === currentPage && dataCurrentPage.length === 1 && currentPage > 1) {
            setCurrentPage(lastPage - 1);
        } else {
            setIsReload(!isReload);
        }
    }
    const showAlert = (color, message) => {
        setAlert({
            ...alert,
            isAlert: true,
            color,
            message,
        });

        setTimeout(() => {
            setAlert({
                ...alert,
                isAlert: false
            });
        }, 4000);
    }
    return (
        <div className="container-fluid feedback-mt-6rem mb-4">

            <CSSTransition in={alert.isAlert} timeout={1000} unmountOnExit classNames="show-alert">
                <div className="alert-section">
                    <section className="alert-section__width">
                        <Alert className={`${alert.color} `}>
                            {alert.message}
                        </Alert>
                    </section>
                </div>
            </CSSTransition>

            <Card className="card--mt-100">
                <CardHeader>Feedback</CardHeader>

                <CardBody>

                    <div className="mb-3 float-right col-4">
                        <InputGroup>
                            <Input placeholder="Search..." />
                            <InputGroupAddon addonType="append">
                                <Button color="secondary">Clear</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Content</th>
                                <th className="w-20">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {dataCurrentPage.map(fb => <DataRow key={fb._id} feedback={fb} reload={onReloadDelete}
                                showAlert={(color, mess) => showAlert(color, mess)}
                            />)}
                        </tbody>
                    </Table>
                    {isLoading ? <LoadingPage /> : null}
                    <div className="float-right">
                        <Pagination totalItems={totalItems} limitPerPage={limitPerPage} currentPage={currentPage} changePage={changePage} />
                    </div>
                </CardBody>

            </Card>

        </div>
    )
}

export default Feedback
