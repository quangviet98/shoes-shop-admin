import React, { useContext } from 'react'
import { Card, CardHeader, CardBody, CardTitle, CardText, Button, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { tokenContext } from "../../../components/Admin";
import axios from 'axios';
import { PREFIX_URL_API } from "../../../constants/global";
import NumberFormat from "react-number-format";

function OrderDetail({ order, closeForm, showAlert, reload }) {
    const date = new Date(order.dateOrder);
    var dateString = date.getUTCDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " "
        + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    const getToken = useContext(tokenContext);

    const handleEdit = () => {
        console.log(getToken.token);
        axios.patch(`${PREFIX_URL_API}/bills/${order._id}`, {}, {
            headers: {
                Authorization: "JWT " + getToken.token
            }
        }).then(response => {
            console.log(response);
            reload();
            closeForm();
            showAlert("success", "Chốt đơn hàng thành công!");

        }).catch(err => {
            console.log(err);
            closeForm();
            showAlert("danger", "Xử lý đơn hàng thất bại!")
        })

    }
    console.log(order);
    return (

        <div className="col-12 add-form bg-white" >



            <Card>
                <CardHeader><b>{order.status ? "Đơn hàng đã xử lý" : "Đơn hàng chưa xử lý"}</b>
                    <button className="btn-close-edit--order"
                        onClick={() => closeForm()}
                    >
                        <FontAwesomeIcon icon={faBackspace} />
                    </button></CardHeader>
                <CardBody>
                    <CardTitle><b>- Khách hàng:</b> {order.customerID.name}</CardTitle>
                    <CardText><b>- Email:</b> {order.customerID.email}</CardText>
                    <CardText><b>- Phone:</b> {order.customerID.phone}</CardText>
                    <CardText><b>- Danh sách sản phẩm:</b></CardText>
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Color</th>
                                <th>Price</th>
                                <th>Quantity</th>

                            </tr>
                        </thead>

                        <tbody>
                            {
                                order.products.map(pro => (
                                    <tr key={pro._id}>
                                        <td>{pro.productID.name}</td>
                                        <td>{pro.productID.color}</td>
                                        <td>{
                                            <NumberFormat value={pro.price}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                renderText={value => value}
                                            ></NumberFormat>

                                        }</td>
                                        <td>{pro.quantity}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>

                    {/* <ul>

                        {order.products.map(pro => (
                            <li key={pro._id}>
                                <p>{pro.productID.name}</p>
                                <p>Color: {pro.productID.color}</p>
                                <p>Đơn giá: {pro.price}</p>
                                <p>Số lượng: {pro.quantity}</p>
                            </li>
                        ))}
                    </ul> */}
                    <CardText><b>- Tổng tiền:  </b>
                        <NumberFormat value={order.total}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'đ'}
                            renderText={value => value}
                        />
                    </CardText>
                    <CardText><b>- Ngày đặt hàng:</b> {dateString}</CardText>
                    <CardText><b>- Note:</b> {order.note}</CardText>
                    <Button color={order.status ? "secondary" : "primary"} disabled={order.status} onClick={handleEdit}>Chốt đơn hàng</Button>
                </CardBody>
            </Card>

        </div>
    )
}

export default OrderDetail
