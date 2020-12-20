import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
//import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import {nationalityData} from '../mdata/nationality';
import {titles} from '../mdata/titles';
import {genders} from '../mdata/genders';
import {countryPhones} from '../mdata/countryPhones';
import { useSelector, useDispatch } from 'react-redux';
import PhoneInput from 'react-phone-input-2'
import {saveApplicant, setFormValue, initFormValue} from '../actions/applicantAction';

import 'react-phone-input-2/lib/style.css'
import "react-datepicker/dist/react-datepicker.css";

const  StaffEditor = () => {

    const data = useSelector((state) => state.req_list);
    const form = useSelector((state) => {
        if(!state.isEdit){
            state.form.id = state.req_list.length+1;
        }
        return state.form;
    });
    
    const dispatch = useDispatch();

    
    const [errors, setErrors] = useState({});

    
    const changeHandler = e => {
        const {name, value} = e.target;
        dispatch(setFormValue(name, value));
    }

    const customComponentChangeHandler = (name, value) => {
        dispatch(setFormValue(name, value));
    }
    

    const dateFormat = (d) => d.getFullYear()  + "/" + (d.getMonth()+1) + "/" + d.getDate();
    

    const handlerSave = e =>{
        e.preventDefault();
        const newData = {...form, ['cid']: form.cid_s1 + form.cid_s2 + form.cid_s3 + form.cid_s4 + form.cid_s5};
        
        const errors = validate(newData);
        
        setErrors(errors);

        if(Object.keys(errors).length === 0){
            dispatch(saveApplicant(newData));
            dispatch(initFormValue());
        }
    }


    const validate = (form) => {

        let errors = {};
        if (!form.title) {
            errors.title = 'required';
        } 
        if (!form.fname) {
            errors.fname = 'required';
        }
        if (!form.lname) {
            errors.lname = 'required';
        }
        if (!form.birthDate) {
            errors.birthDate = 'required';
        }
        if (!form.mphone) {
            errors.mphone = 'required';
        }

           
        return errors;
    }

  
    return (
        
        <Form>
            <Container>
                <Row>
                    <Col xs={12}>
                        <Card className="mt-4">
                            <Card.Body>
                                <Row>
                                    <Col>
                                    
                                        <Form.Group controlId="title">
                                            <Form.Label>Title<span className="text-danger">*</span></Form.Label>
                                            <Form.Control as="select" name={'title'} value={form.title} onChange={changeHandler}>
                                                <option value="">-- Please select --</option>
                                                {titles.map(v=> <option value={v}>{v}</option>)}
                                            </Form.Control>
                                            <span className="text-danger">{errors.title}</span>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="fname">
                                            <Form.Label>Full Name<span className="text-danger">*</span></Form.Label>
                                            <Form.Control type="text" name={'fname'} value={form.fname} placeholder="Full name" onChange={changeHandler} />
                                            <span className="text-danger">{errors.fname}</span>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="lname">
                                            <Form.Label>Last Name<span className="text-danger">*</span></Form.Label>
                                            <Form.Control type="text" name={'lname'} value={form.lname} placeholder="Last name" onChange={changeHandler} />
                                            <span className="text-danger">{errors.lname}</span>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4}>
                                        <Form.Group controlId="birthDate">
                                            <Form.Label>Birth Day<span className="text-danger">*</span></Form.Label>
                                            <div>
                                            <DatePicker className="form-control" name="birthDate"  selected={form.birthDate !== '' && new Date(form.birthDate)} onChange={(d)=>{customComponentChangeHandler('birthDate', dateFormat(d)) }} />
                                            </div>
                                            <span className="text-danger">{errors.birthDate}</span>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="nationality">
                                            <Form.Label>Nationality</Form.Label>
                                            <Form.Control as="select" name={'nationality'} value={form.nationality} onChange={changeHandler}>
                                                <option value="">-- Please select --</option>
                                                {nationalityData.map(v=> <option value={v}>{v}</option>)}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group  controlId="cid">
                                            <Form.Label>Citizen ID</Form.Label>
                                        </Form.Group>
                                        <Form.Group className="form-inline" controlId="cid-s1">
                                            <Form.Control controlId="cid_s1" maxLength={1} name="cid_s1" value={form.cid_s1}  type="text" style={{width: '50px'}} onChange={changeHandler} />
                                            <Form.Control controlId="cid_s2" maxLength={4} name="cid_s2" value={form.cid_s2} className="ml-2" type="text" style={{width: '70px'}} onChange={changeHandler}/>
                                            <Form.Control controlId="cid_s3" maxLength={5} name="cid_s3" value={form.cid_s3} className="ml-2" type="text" style={{width: '90px'}} onChange={changeHandler}/>
                                            <Form.Control controlId="cid_s4" maxLength={2} name="cid_s4" value={form.cid_s4} className="ml-2" type="text" style={{width: '50px'}} onChange={changeHandler}/>
                                            <Form.Control controlId="cid_s5" maxLength={1} name="cid_s5" value={form.cid_s5} className="ml-2" type="text" style={{width: '50px'}} onChange={changeHandler} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group  controlId="gender">
                                            <Form.Label>Gender</Form.Label>
                                        </Form.Group>
                                        <div key={'inline-radio'} className="mb-3">
                                            {genders.map((v)=>
                                                <Form.Check inline label={v} type={'radio'} value={v} onClick={changeHandler} checked={form.gender === v} name={'gender'} id={`inline-radio-${v}`} />
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="mphone" >
                                            <Form.Label>Mobile Phone<span className="text-danger">*</span></Form.Label>
                                        </Form.Group>
                                        <Form.Group className="form-inline" controlId="mphone_c_code">
                                            {/*<Form.Control className="form-inline" as="select">
                                                <option value="">-- Please select --</option>
                                                {countryPhones.map(v=> <option value={v.code}>{v.dial_code}</option>)}
                                            </Form.Control>*/}
                                            <PhoneInput 
                                                
                                                className="form-control"
                                                country={form.phoneCountry}
                                                value={form.mphone}
                                                enableSearch={true}
                                                enableAreaCodes={true}
                                                onChange={(value, country) => {
                                                        customComponentChangeHandler('mphone', value);
                                                        customComponentChangeHandler('phoneCountry', country.countryCode);
                                                    }
                                                }
                                                />
                                                <span className="text-danger">{errors.mphone}</span>
                                            
                                            
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="passportNo">
                                            <Form.Label>Passport No</Form.Label>
                                            <Form.Control type="text" name={'passportNo'} value={form.passportNo} placeholder="Passport No" onChange={changeHandler} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="expSalary">
                                            <Form.Label>Expect Salary</Form.Label>
                                            <Form.Control type="text" name={'expSalary'} value={form.expSalary} placeholder="Expect Salary" onChange={changeHandler} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-right">
                                        <Button color='primary' onClick={handlerSave}>Save</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Form>
    )
}

export default StaffEditor;