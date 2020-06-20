import React, { useContext } from 'react'
import { Card, CardHeader, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { tokenContext } from "../../../components/Admin";
import axios from 'axios';
import { PREFIX_URL_API } from "../../../constants/global";

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
                    <ul>

                        {order.products.map(pro => (
                            <li key={pro._id}>
                                <p>{pro.productID.name}</p>
                                <p>Color: {pro.productID.color}</p>
                                <p>Số lượng: {pro.quantity}</p>
                            </li>
                        ))}
                    </ul>
                    <CardText><b>- Tổng tiền:</b> {order.total}</CardText>
                    <CardText><b>- Ngày đặt hàng:</b> {dateString}</CardText>
                    <CardText><b>- Note:</b> {order.note}</CardText>
                    <Button disabled={order.status} onClick={handleEdit}>Chốt đơn hàng</Button>
                </CardBody>
            </Card>

        </div>
    )
}

export default OrderDetail
