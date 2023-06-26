import styles from "./Navbar.module.css";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import LinksContainer from "./LinksContainer";
import { useFilterContext } from "../../context";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { filterProductState, filterProductDispatch } = useFilterContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      filterProductDispatch({ type: "FILTER_BY_SEARCH", payload: searchQuery });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    // console.log(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(searchQuery);
    navigate("/products");
    filterProductDispatch({ type: "FILTER_BY_SEARCH", payload: searchQuery });
  };

  return (
    <>
      <main className={styles.navbar}>
        <Link to="/">
          {" "}
          <h1 className={styles.heading}>SporTiFy</h1>
        </Link>

        <form className={styles.searchBar} onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Search"
            className={styles.search}
            value={searchQuery}
            onChange={handleChange}
          />
          <button className={styles.searchBtn} type="submit">
            <BsSearch />
          </button>
        </form>

        <LinksContainer />
      </main>
    </>
  );
}
