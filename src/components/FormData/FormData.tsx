import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormData.css';
import EditModal from '../EditForm/EditModal';

const FormData: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData') || '[]');
    setFormData(storedData);
  }, []);

  const handleEdit = (userIndex: number, addressIndex: number) => {
    setSelectedIndex(addressIndex);
    setSelectedUserIndex(userIndex);
    setShowModal(true);
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

  const handleCloseModal = () => {
    setShowModal(false);
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
      handleCloseModal();
    }
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
          <button onClick={() => navigate('/')} className="btn btn-secondary">Back to Form</button>
        </div>
      </div>
      {showModal && selectedIndex !== null && selectedUserIndex !== null && (
        <EditModal
          user={formData[selectedUserIndex]}
          address={formData[selectedUserIndex].addresses[selectedIndex]}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default FormData;
