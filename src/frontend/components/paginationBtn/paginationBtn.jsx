import styles from "./pagination.module.css";

export default function PaginationBtn({ products, handlePage, pageNumber }) {
  const handlePrevBtn = () => {
    handlePage((prev) => {
      if (prev === 0) return products.length - 1;
      else return prev - 1;
    });
  };

  const handleNextBtn = () => {
    handlePage((next) => {
      if (next === products.length - 1) return 0;
      else return next + 1;
    });
  };

  return (
    <div className={styles.paginationBtnContainer}>
      <button className={styles.btn} onClick={handlePrevBtn}>
        Prev
      </button>
      <>
        {products.map((_, index) => (
          <button
            className={
              pageNumber === index
                ? `${styles.btn} ${styles.activeBtn} `
                : `${styles.btn}`
            }
            key={index}
            onClick={() => {
              handlePage(index);
            }}
          >
            {index + 1}
          </button>
        ))}
      </>
      <button className={styles.btn} onClick={handleNextBtn}>
        Next
      </button>
    </div>
  );
}
