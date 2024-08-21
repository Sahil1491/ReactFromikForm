import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormData.css';
import EditModal from '../EditForm/EditModal';
import SignUpModal from '../SignUpForm/SignUpModal';

const FormData: React.FC = () => {
  const [formData, setFormData] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData') || '[]');
    setFormData(storedData);
  }, []);

  const handleEdit = (userIndex: number, addressIndex: number) => {
    setSelectedIndex(addressIndex);
    setSelectedUserIndex(userIndex);
    setShowEditModal(true);
  };

  const handleDelete = (userIndex: number, addressIndex: number) => {
    const updatedUsers = formData.map((user: any, index: number) => {
      if (index === userIndex) {
        return {
          ...user,
          addresses: user.addresses.filter((_: any, i: number) => i !== addressIndex),
        };
      }
      return user;
    });
    setFormData(updatedUsers);
    localStorage.setItem('formData', JSON.stringify(updatedUsers));
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedIndex(null);
    setSelectedUserIndex(null);
  };

  const handleSave = (updatedData: any) => {
    if (selectedIndex !== null && selectedUserIndex !== null) {
      const updatedUsers = formData.map((user: any, index: number) => {
        if (index === selectedUserIndex) {
          const updatedAddresses = user.addresses.map((address: any, addrIndex: number) =>
            addrIndex === selectedIndex ? { ...address, ...updatedData.addresses[0] } : address
          );
          return {
            ...user,
            name: updatedData.name,
            email: updatedData.email,
            password: updatedData.password,
            confirmPassword: updatedData.confirmPassword,
            addresses: updatedAddresses,
          };
        }
        return user;
      });
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
                <th>City</th>
                <th>State</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((user: any, userIndex: number) =>
                user.addresses.map((address: any, addressIndex: number) => (
                  <tr key={`${userIndex}-${addressIndex}`}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{address.city}</td>
                    <td>{address.state}</td>
                    <td>{address.phoneNumber}</td>
                    <td>
                      <FaEdit
                        onClick={() => handleEdit(userIndex, addressIndex)}
                        className="edit-icon me-2"
                        title="Edit"
                      />
                      <FaTrash
                        onClick={() => handleDelete(userIndex, addressIndex)}
                        className="delete-icon"
                        title="Delete"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <button onClick={() => setShowSignUpModal(true)} className="btn btn-secondary">Add User</button>
        </div>
      </div>
      {showEditModal && selectedIndex !== null && selectedUserIndex !== null && (
        <EditModal
          user={formData[selectedUserIndex]}
          address={formData[selectedUserIndex].addresses[selectedIndex]}
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
            addresses: [
              {
                city: '',
                state: '',
                phoneNumber: '',
              },
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
