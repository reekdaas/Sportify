import { toast } from "react-hot-toast";

export const initialFormData = {
  street: "",
  state: "",
  zipcode: "",
  country: "",
  mobile: "",
};

export const initialAddressState = {
  addressList: [
    {
      _id: 1,
      street: "266,Bidhannagar Road",
      state: "WestBengal",
      zipcode: 700036,
      country: "India",
      mobile: 1234567890,
    },
  ],
  addressForm: initialFormData,
  isModalOpen: false,
  selectedAddressId: null,
};

export function addressReducer(state, { type, payload }) {
  switch (type) {
    case "OPEN_MODAL": {
      return { ...state, isModalOpen: payload };
    }
    case "CLOSE_MODAL": {
      return { ...state, isModalOpen: payload };
    }
    case "ADD_ADDRESS": {
      // toast.success("Address added sucessfully!");
      return { ...state, addressList: [...state.addressList, { ...payload }] };
    }
    case "REMOVE_ADDRESS": {
      const newaddressList = state?.addressList.filter(
        ({ _id }) => _id !== payload
      );
      toast.success("Address removed sucessfully!");
      return { ...state, addressList: newaddressList };
    }

    case "EDIT_ADDRESS": {
      const addressEdited = state?.addressList.find(
        ({ _id }) => _id === payload
      );
      // console.log(addressEdited);

      return { ...state, addressForm: addressEdited };
    }

    case "CHANGE_ADDRESS": {
      const { name, value } = payload;
      return {
        ...state,
        addressForm: { ...state.addressForm, [name]: value },
      };
    }
    case "UPDATE_ADDRESS": {
      const addressData = state.addressList.map((data) =>
        payload._id === data._id ? { ...data, ...payload } : data
      );
      // console.log(payload);
      toast.success("Address updated sucessfully!");
      return { ...state, addressList: addressData };
    }
    case "CLEAR_FORM": {
      return { ...state, addressForm: payload };
    }

    case "UPDATE_SELECTED_ADDRESS_ID": {
      return { ...state, selectedAddressId: payload };
    }
    case "FILL_DUMMY_INPUT": {
      return { ...state, addressForm: { ...state.addressForm, ...payload } };
    }

    default: {
      return initialAddressState;
    }
  }
}
