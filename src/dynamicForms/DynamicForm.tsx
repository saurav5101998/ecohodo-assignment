import React, { useState } from "react";
import { validationSchema } from "../utils/validationSchema";
import "./DynamicForm.css";
import useForm from "./hooks/useForm";

const DynamicForm: React.FC = () => {
  const {
    formData,
    setFormData,
    users,
    setUsers,
    resume,
    setResume,
    errors,
    setErrors,
    handleInputChange,
    handleSubmit,
    handleEditUser,
    handleRemoveUser,
  } = useForm();
  console.log("users__", users);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            className="input"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            className="input"
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            className="input"
            value={formData.dob}
            onChange={(e) => handleInputChange("dob", e.target.value)}
          />
        </label>
        <label>
          Mobile:
          <input
            type="text"
            className="input"
            value={formData.mobile}
            onChange={(e) => handleInputChange("mobile", e.target.value)}
          />
        </label>
        <label>
          Resume (PDF):
          <input
            type="file"
            className="input"
            accept=".pdf"
            onChange={(e: any) =>
              handleInputChange(
                "resume",
                e.target.files ? e.target.files[0] : null
              )
            }
          />
        </label>
        <button type="submit" className="button">
          Add User
        </button>
      </form>
      {errors.length > 0 && (
        <div className="error-message">
          <p>Please fix the following errors:</p>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display section */}
      {users.length > 0 && (
        <div className="display-section">
          <h2>Users List</h2>
          <ul className="user-list">
            {users.map((user, index) => (
              <li key={index} className="user-item">
                <p className="user-info">Name: {user.name}</p>
                <p className="user-info">Gender: {user.gender}</p>
                <p className="user-info">Date of Birth: {user.dob}</p>
                <p className="user-info">Mobile: {user.mobile}</p>
                {/* Display PDF link if resume is available */}
                {user.resume && (
                  <p className="resume-link">
                    Resume:{" "}
                    <a
                      href={
                        typeof user.resume === "string"
                          ? user.resume
                          : URL.createObjectURL(user.resume)
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </p>
                )}
                <button
                  onClick={() => handleEditUser(index)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveUser(index)}
                  className="remove-button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DynamicForm;
