import React, { useState, useEffect } from 'react'
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
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { PREFIX_URL_API } from "../../constants/global";
import LoadingPage from '../../components/LoadingPage';
import Pagination from '../../components/Pagination';
import DataRow from './DataRow';
import './styles.scss';
import AddForm from './AddForm';

function Customer() {
    const [isLoading, setIsLoading] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [pagination, setPagination] = useState({
        totalItems: 0,
        limitPerPage: 5,
        currentPage: 1
    })
    const [textSearch, setTextSearch] = useState("");
    const [dataCurrentPage, setDataCurrentPage] = useState([]);
    const [dataTemp, setDataTemp] = useState([]);
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [customer, setCustomer] = useState({})
    const [alert, setAlert] = useState({
        isAlert: false,
        color: "",
        message: ""
    })

    useEffect(() => {
        setIsLoading(true);
        async function fectchData() {
            await axios.get(`${PREFIX_URL_API}/customers/currentPage=${pagination.currentPage}&limitPerPage=${pagination.limitPerPage}`)
                .then(response => {
                    //console.log(response.data.data);
                    const { data } = response;

                    setPagination(prevPagination => {
                        const newPagination = { ...prevPagination, totalItems: data.count };
                        return newPagination
                    });
                    setDataTemp(data.data);
                    setDataCurrentPage(data.data);
                    //setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);

                })
            setIsLoading(false);
        }
        fectchData();
    }, [pagination.currentPage, isReload]);



    const onReLoadAdd = () => {
        setIsAdd(!isAdd);
        const lastPage = Math.ceil(pagination.totalItems / pagination.limitPerPage);
        //setIsReload(!isReload);
        if (pagination.currentPage === lastPage && pagination.limitPerPage === dataCurrentPage.length) {
            setPagination({ ...pagination, currentPage: lastPage + 1 });
        } else {
            if (pagination.currentPage === lastPage) {
                setIsReload(!isReload);
            } else {
                setPagination({ ...pagination, currentPage: lastPage });
            }
        }

    }

    const changePage = (page) => {
        setPagination({ ...pagination, currentPage: page })
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

    const onChangeTextSearch = (e) => {
        setTextSearch(e.target.value);
        const newData = dataCurrentPage.filter(cus => JSON.stringify(cus).toLowerCase().includes(textSearch.toLowerCase()));
        console.log(newData);
        setDataTemp(newData)
    }

    const clearTextSearch = () => {
        setTextSearch("");
        setDataTemp(dataCurrentPage);
    }

    const getCustomerEdit = (cus) => {
        setCustomer(cus);
        setIsEdit(!isEdit);
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
                <CardHeader>Customers
                    <Button color="primary" className="float-right"
                        onClick={() => {
                            if (isEdit) {
                                setIsEdit(false);
                            } else {
                                setIsAdd(prev => !prev);
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faPlusCircle} />
                        Add
                    </Button>
                </CardHeader>

                <CardBody>
                    <CSSTransition classNames="add-form" timeout={500} in={isAdd || isEdit}>
                        {
                            isAdd || isEdit ? (
                                <AddForm
                                    reload={onReLoadAdd}
                                    alert={(color, mess) => showAlert(color, mess)}
                                    mission={isAdd ? "add" : "edit"}
                                    customer={customer}
                                    closeEdit={() => {
                                        setIsEdit(false)
                                        setIsReload(!isReload)
                                    }}
                                />
                            ) : (
                                    <div>
                                        <div className="mb-3 float-right col-4">
                                            <InputGroup>
                                                <Input placeholder="Search..." value={textSearch} onChange={(e) => onChangeTextSearch(e)} />
                                                <InputGroupAddon addonType="append">
                                                    <Button color="secondary" onClick={clearTextSearch}>Clear</Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </div>

                                        <Table bordered striped>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Address</th>
                                                    <th>Role</th>
                                                    <th className="w-20">Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    dataTemp.map((customer, index) => (
                                                        <DataRow key={index}
                                                            customer={customer}
                                                            showAlert={(color, mess) => showAlert(color, mess)}
                                                            getCustomer={(cus) => getCustomerEdit(cus)}
                                                        />
                                                    ))
                                                }
                                            </tbody>
                                        </Table>

                                        {isLoading ? <LoadingPage /> : null}

                                        <div className="float-right">
                                            <Pagination changePage={changePage} totalItems={pagination.totalItems} limitPerPage={pagination.limitPerPage} currentPage={pagination.currentPage} />
                                        </div>
                                    </div>
                                )
                        }

                    </CSSTransition>


                </CardBody>
            </Card>
        </div>
    )
}

export default Customer
