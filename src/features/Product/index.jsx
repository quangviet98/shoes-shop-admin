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
import AddForm from './AddForm';
import './style.scss';
import ProductDetail from './ProductDetail';
import EditForm from './EditForm';

function Product(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [pagination, setPagination] = useState({
        totalItems: 0,
        limitPerPage: 6,
        currentPage: 1
    })
    const [dataCurrentPage, setDataCurrentPage] = useState([]);
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDetail, setIsDetail] = useState(false);
    const [listTypes, setListTypes] = useState([]);
    const [product, setProduct] = useState({});
    const [textSearch, setTextSearch] = useState("");
    const [dataTemp, setDataTemp] = useState([]);
    const [alert, setAlert] = useState({
        isAlert: false,
        color: "",
        message: ""
    })

    useEffect(() => {
        setIsLoading(true);
        async function fectchData() {
            await axios.get(`${PREFIX_URL_API}/products/currentPage=${pagination.currentPage}&limitPerPage=${pagination.limitPerPage}`)
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

    useEffect(() => {
        axios.get(`${PREFIX_URL_API}/types`)
            .then(response => {
                setListTypes(response.data.data);
                //console.log(response.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    // console.log({ pagination });
    //console.log({ dataCurrentPage });
    //console.log({ isAdd });

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

    const selectProduct = (pro) => {
        console.log(pro);
        setProduct(pro);
    }
    //console.log(isEdit || isAdd);

    const onChangeTextSearch = async (e) => {
        await setTextSearch(e.target.value);
        const newData = dataCurrentPage.filter(pro => JSON.stringify(pro).toLowerCase().includes(textSearch.toLowerCase()));
        //console.log(JSON.stringify(dataCurrentPage));
        setDataTemp(newData)
    }
    const clearTextSearch = () => {
        setTextSearch("");
        setDataTemp(dataCurrentPage);
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
            <CSSTransition in={isDetail} timeout={500} unmountOnExit classNames="add-form">
                <section className="container-fluid section-add-product section-show-info p-5 mb-3">
                    {isDetail && <ProductDetail listTypes={listTypes} product={product}
                        closeForm={() => setIsDetail(false)}
                    />}
                </section>
            </CSSTransition>

            <CSSTransition in={isEdit} timeout={500} unmountOnExit classNames="add-form">
                <section className="container-fluid section-add-product section-show-info p-5 mb-3">
                    {isEdit && <EditForm listTypes={listTypes} product={product}
                        closeForm={() => setIsEdit(false)}
                        reload={() => setIsReload(!isReload)}
                        showAlert={(color, mess) => showAlert(color, mess)}
                    />}
                </section>
            </CSSTransition>

            <CSSTransition in={alert.isAlert} timeout={1000} unmountOnExit classNames="show-alert">
                <div className="alert-section">
                    <section className="alert-section__width">
                        <Alert className={`${alert.color} `}>
                            {alert.message}
                        </Alert>
                    </section>
                </div>
            </CSSTransition>

            <Card>
                <CardHeader>Product
                    <Button color="primary" className="float-right"
                        onClick={() => { setIsAdd(prev => !prev) }}
                    >
                        <FontAwesomeIcon icon={faPlusCircle} />
                        Add
                    </Button>
                </CardHeader>

                <CardBody>
                    <CSSTransition in={isAdd} timeout={500} classNames="add-form">
                        {
                            isAdd ? (
                                <section className="container-fluid section-add-product p-5 mb-3">
                                    <AddForm listTypes={listTypes} reload={onReLoadAdd}
                                        showAlert={(color, mess) => showAlert(color, mess)}
                                    />
                                </section>
                            ) :
                                (
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
                                                    <th>Tên sản phẩm</th>
                                                    <th>Loại sản phẩm</th>
                                                    <th>Màu</th>
                                                    <th>Giá</th>
                                                    <th>Trạng thái</th>
                                                    <th className="w-20">Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    dataTemp.map((product, index) => <DataRow key={index} product={product}
                                                        reload={() => setIsReload(!isReload)}
                                                        selected={(pro) => selectProduct(pro)}
                                                        showInfo={() => setIsDetail(true)}
                                                        showEdit={() => setIsEdit(true)}
                                                        showAlert={(color, mess) => showAlert(color, mess)}
                                                    />)
                                                }
                                            </tbody>
                                        </Table>

                                        {isLoading ? <LoadingPage /> : null}

                                        <div className="float-right">
                                            <Pagination changePage={changePage} totalItems={pagination.totalItems} limitPerPage={pagination.limitPerPage} currentPage={pagination.currentPage} />
                                        </div>
                                    </div>)
                        }
                    </CSSTransition>

                </CardBody>
            </Card>
        </div>
    )
}

export default Product
