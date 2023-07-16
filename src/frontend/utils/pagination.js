export default function pagination(productData) {
  const itemsperpage = 6;
  const noOfPages = Math.ceil(productData.length / itemsperpage);
  // console.log(noOfPages);
  const arrayOfProducts = Array.from({ length: noOfPages }, (_, index) => {
    const startIndex = itemsperpage * index;
    const endIndex = startIndex + itemsperpage;
    return productData.slice(startIndex, endIndex);
  });
  return arrayOfProducts;
  // console.log(arrayOfProducts);
  // // const arrayOfProducts=productData.slice()
}
