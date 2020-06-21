import React, { useContext } from 'react'
import { Button, ButtonGroup } from "reactstrap";
import axios from 'axios';
import { PREFIX_URL_API } from "../../constants/global";
import { tokenContext } from "../../components/Admin";
import NumberFormat from "react-number-format";

function DataRow(props) {
    const { product, reload, selected, showInfo, showEdit, showAlert } = props;
    const getToken = useContext(tokenContext);
    //console.log(product);
    const handleOnClick = () => {

        if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
            axios.delete(`${PREFIX_URL_API}/products/${product._id}`, {
                headers: {
                    Authorization: "JWT " + getToken.token
                }
            })
                .then(response => {
                    console.log(response);
                    reload();
                    showAlert("success", "Sản phẩm đã chuyển sang trạng thái ngưng bán!");
                })
                .catch(err => {
                    console.log(err);
                    showAlert("danger", "Xóa sản phẩm thất bại!");
                })
        }
    }

    const handleOnClickInfo = () => {
        selected(product);
        showInfo();
    }

    const handleOnClickEdit = () => {
        selected(product);
        showEdit();
    }

    return (
        <tr >
            <td>{product.name}</td>
            <td>{product.typeID.name}</td>
            <td>{product.color}</td>
            <td>
                <NumberFormat value={product.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    renderText={value => value}
                />
            </td>
            <td>{product.status ? "Còn hàng" : "Ngưng bán"}</td>
            <td className="text-center btn-delete">
                <ButtonGroup>
                    <Button color="warning"
                        onClick={handleOnClickEdit}
                    >
                        Edit
                    </Button>
                    <Button color="info" onClick={handleOnClickInfo}>
                        Detail
                    </Button>

                    <Button color="danger" disabled={!product.status}
                        onClick={handleOnClick}
                    >Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}

export default DataRow
