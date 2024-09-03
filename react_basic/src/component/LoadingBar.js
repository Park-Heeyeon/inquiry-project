const LoadingBar = () => {
  return (
    <div className="loading-bar">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};
export default LoadingBar;
