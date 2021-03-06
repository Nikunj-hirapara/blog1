import React from "react";
import Blog from "./blog.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRoutes,
  useParams,
} from "react-router-dom";

import Add from "./add.js";
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add">Add</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Routes > looks through its children <Route>s and
        renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
          <Route path="/edit/:slug" element={<Add editmode={true} />} />
          <Route path="/:slug" element={<ViewBlog />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3001/api/blog")
      .then((res) => res.json())
      .then((data_) => {
        setData(data_);
      });
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Blog</span>
        </div>
      </nav>
      <br></br>
      <div className="container">{data && <Blog posts={data} />}</div>
    </div>
  );
}

function ViewBlog(props) {
  const [data, setData] = React.useState(null);
  const routes_ = useParams();
  React.useEffect((data) => {
    fetch("http://localhost:3001/api/blog/" + routes_.slug)
      .then((res) => res.json())
      .then((data_) => {
        setData(data_);
      });
  }, []);

  return (
    <>
      <Blog showEdit={true} posts={data ? [data] : []} />
    </>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
export default App;
