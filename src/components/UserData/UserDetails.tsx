import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Alert, Container, Row, Col, Image, Card } from "react-bootstrap";
import { IUser } from "../../Models/IUsers";
import { UserService } from "../../Services/UserService";

interface IUserDetailState {
    loading: boolean;
    user: IUser | null;
    errorMsg: string;
}

const UserDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<IUserDetailState>({
        loading: false,
        user: null,
        errorMsg: "",
    });

    useEffect(() => {
        fetchUserDetails();
    }, [id]);

    const fetchUserDetails = () => {
        setState({ ...state, loading: true, errorMsg: "" });
        UserService.getUserById(Number(id))
            .then(res => setState({ ...state, loading: false, user: res.data, errorMsg: "" }))
            .catch(err => setState({ ...state, loading: false, user: null, errorMsg: err.message }));
    };

    const { loading, user, errorMsg } = state;

    return (
        <Container className="mt-4">
            <h1 className="mb-4">User Details</h1>
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                      
                    </Spinner>
                </div>
            ) : (
                user && (
                    <Card className="p-4">
                        <Row>
                            <Col md={4}>
                                <Image src={user.image} alt={user.firstName} roundedCircle fluid />
                            </Col>
                            <Col md={8}>
                                <h3 className="mb-3">{`${user.firstName} ${user.lastName}`}</h3>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Phone:</strong> {user.phone}</p>
                                <p><strong>Gender:</strong> {user.gender}</p>
                                <p><strong>Age:</strong> {user.age}</p>
                                <p><strong>Company:</strong> {user.company.name}</p>
                                <p><strong>University:</strong> {user.university}</p>
                                <p>
                                    <strong>Address:</strong><br />
                                    {`${user.address.address}, ${user.address.city}, ${user.address.state}, ${user.address.postalCode}, ${user.address.country}`}
                                </p>
                            </Col>
                        </Row>
                    </Card>
                )
            )}
        </Container>
    );
};

export default UserDetail;
