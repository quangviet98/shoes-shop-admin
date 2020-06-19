import React, { useContext } from 'react'
import { Button, ButtonGroup } from "reactstrap";
import axios from 'axios';
import { PREFIX_URL_API } from "../../constants/global";
import { tokenContext } from "../../components/Admin";

function DataRow(props) {
    const { customer, showAlert, getCustomer } = props;
    const getToken = useContext(tokenContext);

    const handleOnClick = () => {
        if (window.confirm("Bạn có chắc muốn reset password của account này?")) {
            axios.patch(`${PREFIX_URL_API}/customers/reset/${customer._id}`, {}, {
                headers: {
                    Authorization: `JWT ${getToken.token}`
                }
            })
                .then(response => {
                    showAlert("alert-success", "Reset password thành công!");
                })
                .catch(err => {
                    showAlert("alert-danger", "Reset password thất bại, kiểm tra kết nối!");
                })
        }
    }

    const handleEdit = () => {
        getCustomer(customer);
    }

    return (
        <tr >
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>{customer.address}</td>
            <td>{customer.role}</td>
            <td className="text-center btn-delete">
                <ButtonGroup>

                    <Button color="primary"
                        onClick={handleOnClick}
                    >Reset</Button>
                    <Button color="warning"
                        onClick={handleEdit}
                    >Edit</Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}

export default DataRow
