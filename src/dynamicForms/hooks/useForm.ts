import React, { useState } from "react";
import { validationSchema } from "../../utils/validationSchema";

type FormData = {
  name: string;
  gender: string;
  dob: string;
  mobile: string;
  resume: string | File;
  forms: any[];
};
export default function useForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "",
    dob: "",
    mobile: "",
    resume: "",
    forms: [],
  });

  const [users, setUsers] = useState<any[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [resume, setResume] = useState<File | null>(null);
  const handleInputChange = (
    field: keyof typeof formData,
    value: string | File
  ) => {
    if (field === "resume") {
      setResume(value as File);
      setFormData((prevData) => ({
        ...prevData,
        resume: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form data before validation:", formData);

    try {
      validationSchema.parse(formData);
      console.log("Validation successful. Form data:", formData);

      const isAnyFieldEmptyOrNull = Object.values(formData).some(
        (value) => value === "" || value === null || value === undefined
      );
      if (isAnyFieldEmptyOrNull) {
        throw new Error("Please fill in all fields.");
      }

      const formDataWithResume = {
        ...formData,
        resume: resume || "",
      };

      setUsers((prevUsers) => [...prevUsers, formDataWithResume]);
      setFormData({
        name: "",
        gender: "",
        dob: "",
        mobile: "",
        resume: "",
        forms: [],
      });
      setResume(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Validation error:", error.message);
        setErrors([error.message]);
      }
    }
  };

  const handleEditUser = (index: number) => {
    const userToEdit = users[index];
    setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
    setFormData(userToEdit);
    setResume(userToEdit.resume instanceof File ? userToEdit.resume : null);
  };

  const handleRemoveUser = (index: number) => {
    setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
  };

  return {
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
  };
}
