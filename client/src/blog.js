import React from "react";
import ReadMore from "./read_more.js";

function Blog(props){
    // const sidebar = (
    //   <ul>
    //     {props.posts.map((post) =>
    //       <li key={post.id}>
    //         {post.title}
    //       </li>
    //     )}
    //   </ul>
    // );
    const content = props.posts.map((post) =>
    <div className="col-lg-4 mb-4">
        <div className="card mx-auto" style={{width: '18rem'}} key={post.id}>
            <img className="card-img-top" src={post.image} alt={post.title} width={100} />
            <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <ReadMore>{post.description}</ReadMore>
            </div>
        </div>
    </div>            
    );

    return (
      <div className="row">        
        {content}
      </div>
    );
  }
  export default Blog;