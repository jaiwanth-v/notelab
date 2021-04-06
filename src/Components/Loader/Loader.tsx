import "./Loader.scss";
const Loader = () => {
  return (
    <div className="loader">
      <div className="dot-wrapper">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
      <small>This might take a while if your note content is large.</small>
    </div>
  );
};

export default Loader;
