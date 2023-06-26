import { useAddressContext } from "../../context";
import Modal from "../modal/modalCard";
import styles from "./addressCard.module.css";
import AddressCardComponent from "./addressCardComponent";
export default function AddressCard({}) {
  const {
    addressState: { isModalOpen: modalOpen, addressList },
    addressDispatch,
  } = useAddressContext();

  // console.log(addressList);

  const handleAddAddress = () => {
    addressDispatch({ type: "OPEN_MODAL", payload: true });
  };

  return (
    <div className={styles.addressCardContainer}>
      <div className={styles.addressCardHeader}>
        <h1>Select Address:</h1>
      </div>
      {addressList.map((data) => (
        <AddressCardComponent data={data} key={data._id} />
      ))}

      <button className={styles.addressCardBtn} onClick={handleAddAddress}>
        Add New Address
      </button>

      <Modal isOpened={modalOpen} />
    </div>
  );
}
