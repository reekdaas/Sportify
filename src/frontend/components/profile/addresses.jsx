import { useState } from "react";
import Modal from "../modal/modalCard";
import styles from "./address.module.css";
import { useAddressContext } from "../../context";
export default function UserAddress() {
  const {
    addressState: { addressList, isModalOpen },
    addressDispatch,
  } = useAddressContext();

  // const handleDelete = () => {};
  const [isEdited, setisEdited] = useState(false);

  return (
    <div className={styles.addressContainer}>
      {addressList.map(({ _id, street, state, country, zipcode, mobile }) => {
        return (
          <div className={styles.addressCard} key={_id}>
            <h3>{street}</h3>
            <h4>
              {state}
              {"  "}
              {zipcode}, {country}
            </h4>
            <h4>Mobile Number:{mobile}</h4>
            <div className={styles.addressBtn}>
              <button
                onClick={() => {
                  addressDispatch({
                    type: "EDIT_ADDRESS",
                    payload: _id,
                  });
                  addressDispatch({
                    type: "OPEN_MODAL",
                    payload: true,
                  });
                  setisEdited(true);
                }}
              >
                Edit{" "}
              </button>
              <button
                onClick={() => {
                  addressDispatch({ type: "REMOVE_ADDRESS", payload: _id });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}

      <button
        className={styles.addAddressBtn}
        onClick={() => {
          addressDispatch({ type: "OPEN_MODAL", payload: true });
        }}
      >
        Add Address
      </button>

      <Modal
        isOpened={isModalOpen}
        isEdited={isEdited}
        changeEdited={setisEdited}
      />
    </div>
  );
}
