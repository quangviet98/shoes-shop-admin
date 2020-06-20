import React from 'react'
import { Form, Input, Label, FormGroup, Button, Row, Col } from "reactstrap";
import { PREFIX_URL_IMG } from "../../../constants/global";
function ProductDetail({ listTypes, product, closeForm }) {

    return (

        <div className="col-12 add-form bg-white" >
            <Form >
                <Row>
                    <Col className="col-8">
                        <FormGroup>
                            <Label for="name">Tên sản phẩm</Label>
                            <Input type="text" name="name" id="name" placeholder="Name..."
                                defaultValue={product.name}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="typeID">Loại sản phẩm</Label>
                            <Input type="select" name="typeID" id="typeID" defaultValue={product.typeID._id}                        >
                                {listTypes.map((type, index) => (
                                    <option key={index} value={type._id}
                                    >{type.name}</option>
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
                                defaultValue={product.color}
                            />
                        </FormGroup>
                    </Col>
                    <Col className="col-6">
                        <FormGroup>
                            <Label for="price">Giá</Label>
                            <Input type="text" name="price" id="price" placeholder="Price..."
                                defaultValue={product.price}
                            />
                        </FormGroup>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="material">Vật liệu</Label>
                            <Input type="text" name="material" id="material" placeholder="Material..."
                                defaultValue={product.material}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>

                    <Label >Ảnh</Label><br />
                    {product.photos.map((url, index) => (
                        <img className="preview-img" key={index} src={`${PREFIX_URL_IMG}/${url}`} alt="..."></img>
                    ))}
                </FormGroup>
                <FormGroup className="mt-2">
                    <input type="radio" id="ready" name="status" value="true" defaultChecked={product.status === true}
                    />
                    <label htmlFor="ready" className="ml-2">   Sẵn sàng</label>
                    <input type="radio" id="pause" name="status" value="false" className="ml-3" defaultChecked={product.status === false}
                    />
                    <label htmlFor="pause" className="ml-2">   Ngưng bán </label><br />
                </FormGroup>


                <FormGroup>
                    <Label for="description">Mô tả</Label>
                    <Input type="textarea" name="description" id="description" placeholder="Description..."
                        defaultValue={product.description}
                    />
                </FormGroup>

                <Button type="button" color="primary" className="col-2 mt-3 text-center offset-5"
                    onClick={() => closeForm()}
                >Close</Button>
            </Form>
        </div>
    )
}

export default ProductDetail
