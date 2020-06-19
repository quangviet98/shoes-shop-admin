import React from 'react'
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";


function DataRow(props) {
    const { order, selected, showInfo } = props;

    const handleOnClickInfo = () => {
        selected(order);
        showInfo();
    }

    const date = new Date(order.dateOrder);
    var dateString = date.getUTCDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " "
        + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return (
        <tr >
            <td>{order.customerID.name}</td>
            <td>{order.customerID.phone}</td>
            <td>{dateString}</td>
            <td>{order.status ? "Đã xử lý" : "Chưa xử lý"}</td>
            <td className="text-center btn-delete">
                <Button color="info" onClick={handleOnClickInfo}>
                    <FontAwesomeIcon icon={faInfoCircle} />  Detail
                </Button>
            </td>
        </tr>
    )
}

export default DataRow
