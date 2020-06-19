import React, { useState, useContext } from 'react'
import "./style.scss";
import { Form, Input, Label, FormGroup, Button, Row, Col } from "reactstrap"
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { PREFIX_URL_API } from "../../../constants/global";
import { tokenContext } from "../../../components/Admin";

const initialValues = {
    name: "",
    typeID: "5e9661950193f809d090a380",
    color: "",
    material: "",
    price: "",
    status: true,
    photos: [],
    description: ""
}


const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required!'),
    color: Yup.string().required('Required!'),
    material: Yup.string().required('Required!'),
    price: Yup.number().required("Required!").positive("Price must be a positive number!"),

})

function AddForm({ listTypes, reload, showAlert }) {
    const [photos, setPhotos] = useState([]);
    const [fileArr, setFileArr] = useState([]);
    const [fileObj, setFileObj] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getToken = useContext(tokenContext);

    //console.log({ listTypes });

    const onSubmit = (data) => {
        //console.log(photos);
        let formData = new FormData();
        formData.append("name", data.name);
        formData.append("color", data.color);
        formData.append("price", data.price);
        formData.append("material", data.material);
        formData.append("status", data.status);
        formData.append("description", data.description);
        formData.append("typeID", data.typeID);
        photos.forEach(element => {
            formData.append("photos", element);
        });

        setIsLoading(true);
        axios.post(`${PREFIX_URL_API}/products`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: "JWT " + getToken.token
            }
        })
            .then(response => {
                //console.log(response);
                reload();
                setIsLoading(false);
                showAlert("alert-success", "Thêm mới sản phẩm thành công!")

            })
            .catch(err => {
                console.log(err);
                // reload();
                if (err.response.status === 409) {
                    showAlert("alert-danger", "Tên sản phẩm đã tồn tại!")
                } else {
                    showAlert("alert-danger", "Thêm sản phẩm thất bại, kiểm tra kết nối!")
                }
                setIsLoading(false);
            })
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    //console.log(formik.getFieldProps("name"));

    const onchangeFile = (e) => {
        setPhotos([...e.target.files]);
        fileObj.length = 0;
        fileArr.length = 0;
        fileObj.push([...e.target.files]);
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArr.push(URL.createObjectURL(fileObj[0][i]))
        }
    }


    return (

        <div className="col-12 add-form" >
            <Form onSubmit={formik.handleSubmit} encType="multipart/form-data" onReset={formik.resetForm}>
                <Row>
                    <Col className="col-8">
                        <FormGroup>
                            <Label for="name">Tên sản phẩm</Label>
                            <Input type="text" name="name" id="name" placeholder="Name..."
                                invalid={formik.errors.name && formik.touched.name && true}
                                {...formik.getFieldProps("name")}
                            />
                            {formik.errors.name && formik.touched.name && <div className="add-err-message">{formik.errors.name}</div>}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="typeID">Loại sản phẩm</Label>
                            <Input type="select" name="typeID" id="typeID"
                                {...formik.getFieldProps("typeID")}>
                                {listTypes.map((type, index) => (
                                    <option key={index} value={type._id}>{type.name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-6">
                        <FormGroup>
                            <Label for="color">Màu</Label>
                            <Input type="text" name="color" id="color" placeholder="Color..."
                                invalid={formik.errors.color && formik.touched.color && true}
                                {...formik.getFieldProps("color")} />
                            {formik.errors.color && formik.touched.color && <div className="add-err-message">{formik.errors.color}</div>}
                        </FormGroup>
                    </Col>
                    <Col >
                        <FormGroup>
                            <Label for="price">Giá</Label>
                            <Input type="text" name="price" id="price" placeholder="Price..."
                                invalid={formik.errors.price && formik.touched.price && true}
                                {...formik.getFieldProps("price")} />
                            {formik.errors.price && formik.touched.price && <div className="add-err-message">{formik.errors.price}</div>}
                        </FormGroup>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="material">Vật liệu</Label>
                            <Input type="text" name="material" id="material" placeholder="Material..."
                                invalid={formik.errors.material && formik.touched.material && true}
                                {...formik.getFieldProps("material")} />
                            {formik.errors.material && formik.touched.material && <div className="add-err-message">{formik.errors.material}</div>}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-6">
                        <FormGroup>
                            <Label for="photos">Ảnh</Label>
                            <Input className="mt-1" type="file" name="phostos" id="photos" multiple
                                onChange={onchangeFile}
                            />
                        </FormGroup>
                    </Col>


                </Row>
                <FormGroup>
                    {fileArr.map((url, index) => (
                        <img className="preview-img" key={index} src={url} alt="..."></img>
                    ))}
                </FormGroup>
                <FormGroup className="mt-2">
                    <input type="radio" id="ready" name="status" value="true"
                        defaultChecked={formik.values.status === true}
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="ready" className="ml-2">   Sẵn sàng</label>
                    <input type="radio" id="pause" name="status" value="false" className="ml-3"
                        defaultChecked={formik.values.status === false}
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="pause" className="ml-2">   Ngưng bán </label><br />
                </FormGroup>


                <FormGroup>
                    <Label for="description">Mô tả</Label>
                    <Input type="textarea" name="description" id="description" placeholder="Description..."
                        {...formik.getFieldProps("description")} />
                </FormGroup>

                <Button type="submit" color="primary" className="col-2 mt-3 text-center offset-5">Submit</Button>
                {isLoading ? (
                    <div className="spinner-add-product "></div>
                ) : null}
            </Form>
        </div>
    )
}

export default AddForm
