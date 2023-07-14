import { Toaster } from "react-hot-toast";

export default function ToastWrapper() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: 20,
          right: 20,
        }}
        toastOptions={{
          duration: 2000,
          style: {
            backgroundColor: "#36454f",
            color: "#fff",
            fontWeight: "800",
          },
        }}
      />
    </>
  );
}
