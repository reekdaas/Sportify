import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./modalCard.module.css";
import { v4 as uuid } from "uuid";
import { useAddressContext, useAuthContext } from "../../context";
import { initialFormData } from "../../reducer/addressReducer";
import { randomAddressList } from "../../utils/randomAddress";

export default function Modal({ isOpened, isEdited, changeEdited }) {
  const {
    addressState: { addressForm },
    addressDispatch,
  } = useAddressContext();

  const addressChangeData = (e) => {
    const { name, value } = e.target;

    addressDispatch({ type: "CHANGE_ADDRESS", payload: { name, value } });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isEdited) {
      addressDispatch({ type: "UPDATE_ADDRESS", payload: { ...addressForm } });
      changeEdited((prevEdit) => {
        changeEdited(!prevEdit);
      });
    } else {
      addressDispatch({
        type: "ADD_ADDRESS",
        payload: { ...addressForm, _id: uuid() },
      });
    }
    addressDispatch({ type: "CLEAR_FORM", payload: initialFormData });
    addressDispatch({ type: "CLOSE_MODAL", payload: false });
  };
  const cancelBtnHandler = () => {
    addressDispatch({ type: "CLEAR_FORM", payload: initialFormData });
    addressDispatch({ type: "CLOSE_MODAL", payload: false });
  };
  const dummyInputHandler = () => {
    const itemNo = Math.trunc(Math.random() * randomAddressList.length);
    const dummyData = randomAddressList[itemNo];
    addressDispatch({
      type: "ADD_ADDRESS",
      payload: { ...dummyData },
    });
    addressDispatch({
      type: "FILL_DUMMY_INPUT",
      payload: { ...dummyData },
    });
    const timerId = setTimeout(() => {
      addressDispatch({ type: "CLEAR_FORM", payload: initialFormData });
      addressDispatch({ type: "CLOSE_MODAL", payload: false });
    }, 500);

    return () => {
      clearInterval(timerId);
    };
  };

  // console.log(isEdited);

  useEffect(() => {
    addressDispatch({ type: "CLEAR_FORM", payload: initialFormData });
  }, []);

  if (!isOpened) return null;

  return createPortal(
    <div className={styles.modal}>
      <div
        className={styles.modalOverlay}
        onClick={() => {
          addressDispatch({ type: "CLOSE_MODAL", payload: false });
          addressDispatch({ type: "CLEAR_FORM", payload: initialFormData });
        }}
      ></div>

      <div className={styles.modalContainer}>
        {" "}
        <h1>Add New Address</h1>
        <form className={styles.modalForm} onSubmit={handleFormSubmit}>
          <input
            name="street"
            placeholder="Street"
            type="text"
            onChange={addressChangeData}
            value={addressForm.street}
            required
          />
          <input
            name="state"
            placeholder="State"
            type="text"
            onChange={addressChangeData}
            value={addressForm.state}
            required
          />
          <input
            name="zipcode"
            placeholder="ZipCode"
            type="text"
            onChange={addressChangeData}
            value={addressForm.zipcode}
            required
          />
          <input
            name="country"
            placeholder="Country"
            type="text"
            onChange={addressChangeData}
            value={addressForm.country}
            required
          />
          <input
            name="mobile"
            placeholder="Mobile Number"
            type="number"
            onChange={addressChangeData}
            value={addressForm.mobile}
            required
          />
          <div className={styles.modalBtnContainer}>
            <button type="submit" className={styles.addBtn}>
              Add
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={cancelBtnHandler}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.dummyInputBtn}
              onClick={dummyInputHandler}
            >
              Dummy Inputs
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
