import { useState, useRef, useEffect} from 'react';

type FormValues = {
  [key: string]: string;
};

const useForm = (initialValues: FormValues) => {
// Store the initial values in a ref to persist them
  const [values, setValues] = useState<FormValues>(initialValues);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Reset form values to initial state
  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    resetForm,
  };
};

export default useForm;
