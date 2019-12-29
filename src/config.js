export default {
  rootPath:
    process.env.REACT_APP_STATE === "localhost" ? "http://localhost:8000" : "http://ec2-52-22-56-26.compute-1.amazonaws.com:8000"
    // process.env.REACT_APP_STATE === "localhost" ? "http://localhost:8000" : "http://localhost:8000"
};
