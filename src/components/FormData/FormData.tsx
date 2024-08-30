import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormData.css';
import UserFormModal from '../Modals/UserFormModal'; // Ensure the import path is correct

const FormData: React.FC = () => {
  const [formData, setFormData] = useState<any[]>([]);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add'); // Track modal mode

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData') || '[]');
    setFormData(storedData);
  }, []);

  const handleEdit = (userIndex: number) => {
    setSelectedUserIndex(userIndex);
    setModalMode('edit');
    setShowUserModal(true);
  };

  const handleDelete = (userIndex: number) => {
    const updatedUsers = formData.filter((_: any, index: number) => index !== userIndex);
    setFormData(updatedUsers);
    localStorage.setItem('formData', JSON.stringify(updatedUsers));
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
    setSelectedUserIndex(null);
  };

  const handleSave = (updatedData: any) => {
    if (modalMode === 'edit' && selectedUserIndex !== null) {
      const updatedUsers = formData.map((user: any, index: number) =>
        index === selectedUserIndex ? { ...user, ...updatedData } : user
      );
      setFormData(updatedUsers);
      localStorage.setItem('formData', JSON.stringify(updatedUsers));
    } else if (modalMode === 'add') {
      setFormData([...formData, updatedData]);
      localStorage.setItem('formData', JSON.stringify([...formData, updatedData]));
    }
    handleCloseUserModal();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Registered User Data</h2>
      <div className="row">
        <div className="col-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Current Address</th>
                <th>Permanent Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((user: any, userIndex: number) => (
                <tr key={userIndex}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="address-cell">
                    <div><strong>City:</strong> {user.addresses[0]?.city}</div>
                    <div><strong>State:</strong> {user.addresses[0]?.state}</div>
                    <div><strong>Phone Number:</strong> {user.addresses[0]?.phoneNumber}</div>
                  </td>
                  <td className="address-cell">
                    <div><strong>City:</strong> {user.addresses[1]?.city}</div>
                    <div><strong>State:</strong> {user.addresses[1]?.state}</div>
                    <div><strong>Phone Number:</strong> {user.addresses[1]?.phoneNumber}</div>
                  </td>
                  <td>
                    <FaEdit
                      onClick={() => handleEdit(userIndex)}
                      className="edit-icon me-2"
                      title="Edit"
                    />
                    <FaTrash
                      onClick={() => handleDelete(userIndex)}
                      className="delete-icon"
                      title="Delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <button onClick={() => {
            setModalMode('add');
            setShowUserModal(true);
          }} className="btn btn-secondary">Add User</button>
        </div>
      </div>
      {showUserModal && (
        <UserFormModal
          user={modalMode === 'edit' && selectedUserIndex !== null ? formData[selectedUserIndex] : undefined}
          onClose={handleCloseUserModal}
          onSave={handleSave}
          modalTitle={modalMode === 'edit' ? 'Edit User' : 'Add User'}
          showPasswordFields={modalMode === 'add'}
        />
      )}
    </div>
  );
};

export default FormData;
