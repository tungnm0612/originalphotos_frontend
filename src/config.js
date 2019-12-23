export default {
  rootPath:
    process.env.REACT_APP_STATE === "localhost" ? "http://localhost:8000" : "http://ec2-3-86-215-108.compute-1.amazonaws.com:8000"
    // process.env.REACT_APP_STATE === "localhost" ? "http://localhost:6969" : "http://localhost:6969"
};
