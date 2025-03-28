import React from "react";
import "./Card.css";

function Card({ user, onEdit, onDelete }) {
  return (
    <div className="card">
      <h2 className="card__name">
        {user.first_name} {user.last_name}
      </h2>
      <p className="card__email">Email: {user.email}</p>
      <p className="card__birthday">
        Birthday: {new Date(user.birthday).toLocaleDateString("es-ES")}
      </p>
      {user.image_url && (
        <img className="card__image" src={user.image_url} alt={user.first_name} />
      )}
      <div className="card__buttons">
        <button className="card__button btn card__button--edit" onClick={() => onEdit(user)}>
          Edit
        </button>
        <button className="card__button btn card__button--delete" onClick={() => onDelete(user)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
