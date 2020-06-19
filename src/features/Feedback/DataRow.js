import React, { useContext } from 'react'
import { Button } from 'reactstrap';
import axios from "axios";
import { PREFIX_URL_API } from "../../constants/global";
import { tokenContext } from "../../components/Admin";

function DataRow(props) {
    const { feedback, reload, showAlert } = props;
    const { customer, content } = feedback;
    const getToken = useContext(tokenContext);

    const handleOnClick = () => {

        if (window.confirm("Bạn có chắc muốn xóa phần tử này?")) {


            axios.delete(`${PREFIX_URL_API}/feedbacks/${feedback._id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "JWT " + getToken.token
                }
            })
                .then(response => {
                    reload();
                    showAlert("success", "Xóa feedback thành công!");
                })
                .catch(err => {
                    console.log(err);
                    showAlert("danger", "Xóa feedback thất bại!");
                })
        }
    }

    return (
        <tr >
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>{content}</td>
            <td className="text-center btn-delete">
                <Button className="w-75" color="danger"
                    onClick={handleOnClick}
                >Delete</Button>
            </td>
        </tr>
    )
}

export default DataRow
