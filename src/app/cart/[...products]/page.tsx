interface ProductsPageProps {
  params: Promise<{ products: string[] }>;
}

const ProductsPage = async ({ params }: ProductsPageProps) => {
  const { products } = await params;

  console.log("gggg");
  console.log(products);

  return (
    <div className="fix-height text-3xl font-bold !p-5">
      ProductsPage
      <ul className="!mt-7">
        {products.map((route, index) => (
          <li key={index} className="font-normal text-xl text-gray-600">{route}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
