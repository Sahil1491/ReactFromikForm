import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormData.css';
import EditModal from '../Modals/EditModal/EditModal';
import SignUpModal from '../Modals/SignUpModal/SignUpModal';

const FormData: React.FC = () => {
  const [formData, setFormData] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData') || '[]');
    setFormData(storedData);
  }, []);

  const handleEdit = (userIndex: number) => {
    setSelectedUserIndex(userIndex);
    setShowEditModal(true);
  };

  const handleDelete = (userIndex: number) => {
    const updatedUsers = formData.filter((_: any, index: number) => index !== userIndex);
    setFormData(updatedUsers);
    localStorage.setItem('formData', JSON.stringify(updatedUsers));
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUserIndex(null);
  };

  const handleSave = (updatedData: any) => {
    if (selectedUserIndex !== null) {
      const updatedUsers = formData.map((user: any, index: number) =>
        index === selectedUserIndex ? { ...updatedData } : user
      );
      setFormData(updatedUsers);
      localStorage.setItem('formData', JSON.stringify(updatedUsers));
      handleCloseEditModal();
    }
  };

  const handleSignUpSave = (newUserData: any) => {
    setFormData([...formData, newUserData]);
    localStorage.setItem('formData', JSON.stringify([...formData, newUserData]));
    handleSignUpClose();
  };

  const handleSignUpClose = () => {
    setShowSignUpModal(false);
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
          <button onClick={() => setShowSignUpModal(true)} className="btn btn-secondary">Add User</button>
        </div>
      </div>
      {showEditModal && selectedUserIndex !== null && (
        <EditModal
          user={formData[selectedUserIndex]}  
          onClose={handleCloseEditModal}
          onSave={handleSave}
        />
      )}
      {showSignUpModal && (
        <SignUpModal
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeToTerms:false,
            addresses: [
              { city: '', state: '', phoneNumber: '' },  
              { city: '', state: '', phoneNumber: '' }, 
            ],
          }}
          onSave={handleSignUpSave}
          onClose={handleSignUpClose}
        />
      )}
    </div>
  );
};

export default FormData;
