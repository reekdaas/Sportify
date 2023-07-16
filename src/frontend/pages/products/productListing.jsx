import { Filter } from "../../components";
import { useFilterContext, useProductContext } from "../../context";
import getFilteredProducts from "../../utils/getFilteredProducts";
import styles from "./productList.module.css";
import CardComponent from "../../components/card/cardComponent";
import pagination from "../../utils/pagination";
import { useState } from "react";
import PaginationBtn from "../../components/paginationBtn/paginationBtn";
import Spinner from "../../components/spinner/spinner";

export default function ProductListing() {
  // const { state } = useLocation();
  const [pageNumber, setPageNUmnber] = useState(0);

  const { filterProductState, loading } = useFilterContext();
  const { productState } = useProductContext();

  const filteredProducts = getFilteredProducts(
    productState?.productList,
    filterProductState
  );
  const products = pagination(filteredProducts);
  const productsPerPage = products[pageNumber];

  return (
    <main className={styles.mainContainer}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Filter />
          <div className={styles.container}>
            <div className={styles.cardContainer}>
              {" "}
              {productsPerPage?.map((filteredProduct) => (
                <CardComponent
                  product={filteredProduct}
                  key={filteredProduct?._id}
                />
              ))}
            </div>
            {!loading ? (
              <div className={styles.btnContainer}>
                {" "}
                <PaginationBtn
                  products={products}
                  handlePage={setPageNUmnber}
                  pageNumber={pageNumber}
                />
              </div>
            ) : null}
          </div>
        </>
      )}
    </main>
  );
}
