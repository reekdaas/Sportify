import { useAddressContext } from "../../context";
import styles from "./addressCardComponent.module.css";

export default function AddressCardComponent({ data }) {
  const {
    addressState: { selectedAddressId },
    addressDispatch,
  } = useAddressContext();

  const updateSelecetAddressId = (e) => {
    const addressId = e.target.value;

    addressDispatch({
      type: "UPDATE_SELECTED_ADDRESS_ID",
      payload: addressId,
    });
  };
  // console.log(typeof selectedAddressId);

  return (
    <div className={styles.addressCard} key={data?._id}>
      <input
        type="radio"
        id={data?._id}
        name="addressInfo"
        value={data?._id}
        checked={selectedAddressId === String(data?._id)}
        onChange={updateSelecetAddressId}
      />
      <label htmlFor="id" className={styles.addressCardInfo}>
        <h2>{data?.street}</h2>
        <h2>
          {data?.state}
          {"  "}
          {data?.zipcode}
        </h2>
        <h2>Mobile Number: {data?.mobile}</h2>
      </label>
    </div>
  );
}
