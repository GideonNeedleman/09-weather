function Loader(isLoading) {
  return <>{isLoading && <p className="loader">Loading...</p>}</>;
}

export default Loader;
