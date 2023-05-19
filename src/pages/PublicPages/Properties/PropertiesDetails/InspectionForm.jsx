import React from "react";
import "./InspectionForm.css";
import { useFormik } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  message: Yup.string().required("Message is required"),
});
const InspectionForm = (props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      let obj = {
        propertyId: props.propertyId,
        ...values,
      };
      // process the form data here
      resetForm(); // this will reset the form to its initial values
    },
  });
  const handleClose = () => {
    formik.resetForm();
  };
  return (
    <>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content" style={{ borderRadius: "15px" }}>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                <b>Inspection Request</b>
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body mx-3">
              {/* FORM */}
              <form onSubmit={formik.handleSubmit}>
                <div class="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="input"
                    id="name"
                    name="name"
                    placeholder=""
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="error">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div class="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="input"
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder=""
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div class="form-group">
                  <label for="name">Phone Number</label>
                  <input
                    type="text"
                    className="input"
                    id="phone"
                    name="phone"
                    placeholder=""
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="error">{formik.errors.phone}</div>
                  ) : null}
                </div>
                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea
                    type="text"
                    className="input"
                    name="message"
                    placeholder=""
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    id="message"
                    rows="3"
                  ></textarea>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary py-2 px-4"
                    data-dismiss="modal"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary py-2 px-4">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default InspectionForm;