import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Container } from "react-bootstrap";
import { IUser } from "../../Models/IUsers";
import { UserService } from "../../Services/UserService";
import Pagination from "../Pagination/Pagination";

interface IState {
    loading: boolean;
    users: IUser[];
    errorMsg: string;
    currentPage: number;
    totalItems: number;
}

const Users: React.FC = () => {
    const [state, setState] = useState<IState>({
        loading: false,
        users: [] as IUser[],
        errorMsg: "",
        currentPage: 1,
        totalItems: 0,
    });

    const itemsPerPage = 10;

    useEffect(() => {
        fetchUsers(state.currentPage);
    }, [state.currentPage]);

    const fetchUsers = (page: number) => {
        setState({ ...state, loading: true, users: [], errorMsg: "" });
        UserService.getallUsers()
            .then(res =>
                setState({
                    ...state,
                    loading: false,
                    users: res.data.users.slice((page - 1) * itemsPerPage, page * itemsPerPage),
                    totalItems: res.data.total,
                    errorMsg: "",
                })
            )
            .catch(err =>
                setState({
                    ...state,
                    loading: false,
                    users: [],
                    errorMsg: err.message,
                })
            );
    };

    const handlePageChange = (page: number) => {
        setState({ ...state, currentPage: page });
    };

    const { loading, users, errorMsg, currentPage, totalItems } = state;

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Data from API</h1>
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Age</th>
                                <th>Company</th>
                                <th>University</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.age}</td>
                                        <td>{user.company.name}</td>
                                        <td>{user.university}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={10} className="text-center">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </Container>
    );
};

export default Users;
