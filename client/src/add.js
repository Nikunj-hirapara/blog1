import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Add(props) {
  const [data, setData] = React.useState({
    title: "",
    description: "",
    image: null,
  });

  const routes_ = useParams();

  React.useEffect(() => {
    if (props.editmode) {
      fetch("http://localhost:3001/api/blog/" + routes_.slug)
        .then((res) => res.json())
        .then((data_) => {
          setData(data_);
        });
    }
  }, []);

  const navigate = useNavigate();

  function submitFunction(event) {
    event.preventDefault();
    const form = new FormData();
    form.append("title", data.title);
    form.append("description", data.description);
    form.append("image", data.image);
    const options = {
      method: "post",
      body: form,
    };
    let url = "http://localhost:3001/api/blog";
    if (props.editmode) {
      url = "http://localhost:3001/api/blog/" + data._id;
    }

    // send POST request
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        navigate("/");
      });
  }
  function setdatafn(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 mx-auto">
          <h1 className="heading">Add Blog</h1>
          <form onSubmit={submitFunction}>
            <div className="form-group">
              <label htmlFor="exampleFormControlFile1">
                Choose image for Blogs
              </label>
              <input
                type="file"
                className="form-control-file"
                name="images"
                onChange={(e) => setData({ ...data, image: e.target.files[0] })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="heading">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Enter Blog title"
                value={data.title}
                onChange={setdatafn}
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                placeholder="Description"
                value={data.description}
                onChange={setdatafn}
              />
            </div>
            <div className="text-right">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Add;
