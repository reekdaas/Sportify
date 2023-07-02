import { Filter } from "../../components";
import { useFilterContext, useProductContext } from "../../context";
import getFilteredProducts from "../../utils/getFilteredProducts";
import styles from "./productList.module.css";
import CardComponent from "../../components/card/cardComponent";

export default function ProductListing() {
  // const { state } = useLocation();

  const { filterProductState } = useFilterContext();
  const { productState } = useProductContext();

  const filteredProducts = getFilteredProducts(
    productState?.productList,
    filterProductState
  );

  // console.log(filteredProducts);
  // // console.log(productState);
  // if (filterProductState.length === 0) {
  // }

  return (
    <main className={styles.mainContainer}>
      <Filter />
      <div className={styles.container}>
        {filteredProducts?.map((filteredProduct) => (
          <CardComponent product={filteredProduct} key={filteredProduct?._id} />
        ))}
      </div>
    </main>
  );
}
