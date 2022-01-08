import React from "react";
import { Link } from "react-router-dom";
import ReadMore from "./read_more.js";

function Blog(props) {
  const content = props.posts.map((post) => (
    <div
      className="col-lg-4 mb-4"
      key={Math.floor(Math.random() * props.posts.length)}
    >
      <div className="card mx-auto" style={{ width: "18rem" }}>
        <Link to={"/" + post.slug}>
          <img
            className="card-img-top"
            src={"http://localhost:3001/" + post.image}
            alt={post.title}
            width={100}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <ReadMore>{post.description}</ReadMore>
          {props.showEdit && <Link to={"/edit/" + post.slug}>Edit</Link>}
        </div>
      </div>
    </div>
  ));

  return <div className="row">{content}</div>;
}
export default Blog;
