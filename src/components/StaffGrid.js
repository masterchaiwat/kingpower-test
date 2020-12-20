import CustomTable from './CustomTable';
import { useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { Container, Card, Row, Col} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { loadDataForEdit, deleteApplicant, rowSelectionIds, rowSelectionAll, deleteSelection } from '../actions/applicantAction';

export default function StaffGrid() {
    const data = useSelector((state) => state.req_list);
    const selectionIds = useSelector((state) => state.selectionIds);

    const dispatch = useDispatch();


    const handleClickSelectAllStaff = (e) => {
        dispatch(rowSelectionAll(e.target.checked));
    }

    const handlerEdit = (row) => {
        dispatch(loadDataForEdit(row));
    }

    const handlerDelete = (row) => {
        dispatch(deleteApplicant(row));
    }

    const handlerSelectCheckBox = (e, row) => {
        dispatch(rowSelectionIds(e.target.checked, row.id));
    }

    const handlerDeleteSelection = (e) => {
        dispatch(deleteSelection());
    }

    const columns = useMemo(
        () => [
            {
                Header: '',
                accessor: 'id', // accessor is the "key" in the data
                Cell: ({ cell: { value, column }, row: { original } }) => {
                    const selectionIds = useSelector((state) => state.selectionIds);
                    return (<input type={'checkbox'} checked={selectionIds.indexOf(original.id) > -1} onClick={(e) => {handlerSelectCheckBox(e, original)}} />);
                }
            },
            {
                Header: () => <div className="text-center">Name</div>,
                accessor: 'fname',
                Cell: ({ cell: { value, column }, row: { original } }) => {
                    return (<>{original.fname} {original.lname}</>);
                }
            },
            {
                Header: () => <div className="text-center">Gender</div>,
                accessor: 'gender',
                Cell: ({ cell: { value, column }, row: { original } }) => {
                    return (<div className="text-center">{value}</div>);
                }
            },
            {
                Header: () => <div className="text-center">Mobile Phone</div>,
                accessor: 'mphone',
                Cell: ({ cell: { value, column }, row: { original } }) => {
                    return (<div className="text-center">{original.phoneCountryCode} {original.mphone}</div>);
                }
            },
            {
                Header: () => <div className="text-center">Nationality</div>,
                accessor: 'nationality',
                Cell: ({ cell: { value, column }, row: { original } }) => {
                    return (<div className="text-center">{value}</div>);
                }
            },
            {
                Header: '',
                accessor: 'xx',
                Cell: ({ cell: { value, column }, row: { original } }) => {
                    return (<><Button variant="info" onClick={()=>{handlerEdit(original)}}>Edit</Button> {' '} <Button variant="danger" onClick={()=>{handlerDelete(original)}}>Delete</Button></>);
                }
            }
        ],
        []
    );


    return (
        <>
            <Container>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <input type={'checkbox'} name="selectedAll" checked={data.length === selectionIds.length} onClick={handleClickSelectAllStaff} /> Selected All <Button variant="danger" onClick={handlerDeleteSelection}>Delete</Button>
                            </Col>
                        </Row>
                        <CustomTable columns={columns} data={data} />
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}