import PageHeading from "../PageHeading";

const DynamicProductDetail = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-y-6">
      <PageHeading props={"Rakhi Special"} />
      <div className="font-sans font-medium break-words text-xl  text-[var(--text-color-main)]">
        Enjoy hand-crafted cakes by Tuileries Patisserie.
      </div>
    </div>
  );
};

export default DynamicProductDetail;
