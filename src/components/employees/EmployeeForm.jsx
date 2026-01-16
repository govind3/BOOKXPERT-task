import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEmployees } from "../../context/EmployeeContext";
import ToggleSwitch from "../common/ToggleSwitch";

const STATES = [
  "Bihar",
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Tamil Nadu",
  "Gujarat",
  "Rajasthan",
];

const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of Birth is required"),
  state: Yup.string().required("State is required"),
});

const EmployeeForm = ({ close, editData }) => {
  const { addEmployee, updateEmployee } = useEmployees();
  const [imagePreview, setImagePreview] = useState("");

  const initialValues = {
    name: "",
    gender: "",
    dob: "",
    state: "",
    isActive: true,
    image: "",
  };

  useEffect(() => {
    if (editData?.image) {
      setImagePreview(editData.image);
    }
  }, [editData]);

  const handleSubmit = (values) => {
    const payload = {
      ...values,
      image: imagePreview,
      id: editData?.id,
    };

    editData ? updateEmployee(payload) : addEmployee(payload);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {editData ? "Edit Employee" : "Add Employee"}
        </h2>

        <Formik
          initialValues={editData || initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              {/* Full Name */}
              <div className="mb-3">
                <label className="block text-sm font-medium">Full Name</label>
                <Field name="name" className="w-full border rounded p-2" />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Gender */}
              <div className="mb-3">
                <label className="block text-sm font-medium">Gender</label>
                <Field
                  as="select"
                  name="gender"
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* DOB */}
              <div className="mb-3">
                <label className="block text-sm font-medium">
                  Date of Birth
                </label>
                <Field
                  type="date"
                  name="dob"
                  className="w-full border rounded p-2"
                />
                <ErrorMessage
                  name="dob"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* State */}
              <div className="mb-3">
                <label className="block text-sm font-medium">State</label>
                <Field
                  as="select"
                  name="state"
                  className="w-full border rounded p-2"
                >
                  <option value="">Select State</option>
                  {STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="state"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Profile Image */}
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImagePreview(reader.result);
                      setFieldValue("image", reader.result);
                    };
                    reader.readAsDataURL(file);
                  }}
                />

                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-20 h-20 rounded-full"
                  />
                )}
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm font-medium">Active Status</span>
                <ToggleSwitch
                  enabled={values.isActive}
                  onToggle={() => setFieldValue("isActive", !values.isActive)}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={close}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {editData ? "Update" : "Save"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EmployeeForm;
