export default function Home() {
  const getData = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return <h1 onClick={getData}>Home</h1>;
}
