import React, { useState, useEffect, useContext } from 'react'
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
import axios from "axios";
import { PREFIX_URL_API } from "../../constants/global";
import LoadingPage from '../../components/LoadingPage';
import Pagination from '../../components/Pagination';
import DataRow from './DataRow';
import './style.scss';
import { tokenContext } from "../../components/Admin";
import OrderDetail from './OrderDetail';


function Order(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [pagination, setPagination] = useState({
        totalItems: 0,
        limitPerPage: 10,
        currentPage: 1
    })
    const [dataCurrentPage, setDataCurrentPage] = useState([]);
    const [isDetail, setIsDetail] = useState(false);
    const [alert, setAlert] = useState({
        isAlert: false,
        color: "",
        message: ""
    })
    const [order, setOrder] = useState({});

    const getToken = useContext(tokenContext);    
   
    useEffect(() => {
        setIsLoading(true);
        
        async function fectchData() {
           
            await axios.get(`${PREFIX_URL_API}/bills/currentPage=${pagination.currentPage}&limitPerPage=${pagination.limitPerPage}`,{
                headers: {
                    Authorization : "JWT " + getToken.token
                }
            }).then(response => {
                    //console.log(response.data.data);
                    const { data } = response;
                    setPagination(prevPagination => {
                        const newPagination = { ...prevPagination, totalItems: data.count };
                        return newPagination
                    });
                    setDataCurrentPage(data.data);
                    //setIsLoading(false);
                }).catch(err => {
                    console.log(err);

                })
            setIsLoading(false);
        }
        fectchData();
    }, [pagination.currentPage, isReload]);


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
    //console.log(dataCurrentPage);
    const selectedOrder = (order) =>{
        setOrder(order);
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
                <CardHeader>Orders
                   
                </CardHeader>

                <CardBody>
                    <CSSTransition in={isDetail} timeout={500} classNames="add-form">

                    {
                        isDetail ? (
                            <section className="">
                                {isDetail && <OrderDetail order={order}
                                    closeForm={() => setIsDetail(false)}   
                                    showAlert={(color, mess) => showAlert(color, mess)}   
                                    reload={()=>setIsReload(!isReload)}           
                                />}
                            </section>
                        ):(
                    
                            <div>
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
                                            <th>Tên khách hàng</th>
                                            <th>Số điện thoại</th>
                                            <th>Ngày đặt hàng</th>                               
                                            <th>Trạng thái</th>
                                            <th className="w-20">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            dataCurrentPage.map((order, index) => <DataRow key={index} order={order}
                                                reload={() => setIsReload(!isReload)}
                                                showInfo={() => setIsDetail(true)}                                    
                                                selected={(order) => selectedOrder(order)}
                                            />)
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

export default Order
