import React, { useState } from "react";
import { useLocalStorageState } from "./assets/hooks/useLocalStorageState";
import { useCrudApi } from "./assets/hooks/useCrudApi";
import Modal from "./assets/components/Modal";
import AddEditForm from "./assets/components/AddEditForm";
import Card from "./assets/components/Card";
import "./App.css";

const baseUrl = "https://users-crud-api-production-9c59.up.railway.app/api/v1/users/";

function App() {
  const [users, setUsers] = useLocalStorageState("users", []);
  const [, { create: apiCreate, update: apiUpdate, remove: apiRemove }] = useCrudApi(baseUrl);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalChild, setModalChild] = useState(null);

  const createUser = async (newUser) => {
    const createdUser = await apiCreate(newUser);
    if (createdUser) {
      setUsers([...users, createdUser]);
      setModalIsOpen(false);
    }
  };

  const updateUser = async (updatedUser) => {
    const updatedUserFromApi = await apiUpdate(updatedUser.id, updatedUser);
    if (updatedUserFromApi) {
      setUsers(users.map((u) =>
        u.id === updatedUserFromApi.id ? updatedUserFromApi : u
      ));
      setModalIsOpen(false);
    }
  };

  const deleteUser = async (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.first_name} ${user.last_name}?`
    );
    if (confirmed) {
      await apiRemove(user.id);
      setUsers(users.filter((u) => u.id !== user.id));
    }
  };

  const showAddModal = () => {
    setModalChild(
      <AddEditForm 
        submitData={createUser} 
        closeModal={() => setModalIsOpen(false)} 
      />
    );
    setModalIsOpen(true);
  };

  const showEditModal = (user) => {
    setModalChild(
      <AddEditForm 
        submitData={updateUser} 
        user={user} 
        closeModal={() => setModalIsOpen(false)} 
      />
    );
    setModalIsOpen(true);
  };

  return (
    <div className="app">
      <div className="app__header">
        <h1>Users App</h1>
        <button className="app__button btn" onClick={showAddModal}>
          Add new user
        </button>
      </div>
      <div className="app__users">
        {users.length > 0 ? (
          users.map((user) => (
            <Card 
              key={user.id} 
              user={user} 
              onEdit={showEditModal} 
              onDelete={deleteUser} 
            />
          ))
        ) : (
          <p className="app__no-users">No users found</p>
        )}
      </div>
      <Modal openModal={modalIsOpen} closeModal={() => setModalIsOpen(false)}>
        {modalChild}
      </Modal>
    </div>
  );
}

export default App;
