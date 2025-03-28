import React, { useState, useEffect } from "react";
import "./AddEditForm.css";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  birthday: "",
  image_url: "",
};

function AddEditForm({ submitData, user = null, closeModal }) {
  const [dataForm, setDataForm] = useState(initialValues);

  useEffect(() => {
    if (user) setDataForm(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedBirthday = dataForm.birthday
      ? new Date(dataForm.birthday).toISOString()
      : "";
    let payload = { ...dataForm, birthday: formattedBirthday };

    if (user && !payload.id) {
      payload.id = user.id;
    }
    submitData(payload);
    setDataForm(initialValues);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {Object.keys(initialValues).map((key) => (
        <div key={key} className="form__group">
          <label className="form__label">{key.replace("_", " ")}:</label>
          <input
            type={
              key === "password"
                ? "password"
                : key === "email"
                ? "email"
                : key === "birthday"
                ? "date"
                : "text"
            }
            name={key}
            value={dataForm[key]}
            onChange={handleChange}
            className="form__input"
          />
        </div>
      ))}
      <div className="form__actions">
        <button type="submit" className="form__button btn">
          {user ? "Save Changes" : "Add"}
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="form__button btn form__button--cancel"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddEditForm;
