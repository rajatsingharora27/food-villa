import PropTypes from "prop-types";

const PageHeading = ({ props }) => {
  return (
    <h1 className="font-sans  font-medium text-4xl text-[var(--text-color-main)] uppercase">
      {props}
    </h1>
  );
};

PageHeading.propTypes = {
  props: PropTypes.string,
};
export default PageHeading;
