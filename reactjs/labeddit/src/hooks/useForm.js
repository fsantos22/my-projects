import { useState } from "react";

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);

  const onChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };
  const clearFields = () => {
    setForm(initialState);
  };
  return [form, onChange, clearFields];
};

export default useForm;
