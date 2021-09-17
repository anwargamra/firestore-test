import React, { useState } from "react";
import NewsDataService from "../services/NewsService";
import { storage } from "../firebase";


const News = (props) => {
  const initialNewsState = {
    key: null,
    title: "",
    description: "",
    link :"",
    urlimg : "",
    categories:"",
  };
  const [currentN, setCurrentN] = useState(initialNewsState);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  const { ele } = props;
  if (currentN.id !== ele.id) {
    setCurrentN(ele);
    setMessage("");
  }


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentN({ ...currentN, [name]: value });
  };
  function handleChangeimg(e) {
    setFile(e.target.files[0]);
  }
  function handleUpload(e) {
    e.preventDefault();
    const ref = storage.ref(`/images/${file.name}`);
    const uploadTask = ref.put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      ref.getDownloadURL().then((url) => {
        setFile(null);
        setURL(url);
      });
    });
  }


  const UpdateNews = () => {
    const data = {
      title: currentN.title,
      description: currentN.description,
      link: currentN.link,
      categories: currentN.categories,
      urlimg : currentN.urlimg,
    };
    NewsDataService.update(currentN.id, data)
      .then(() => {
        setMessage("The News was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });

  };

  const DeleteNews = () => {
    NewsDataService.remove(currentN.id)
      .then(() => {
        props.refreshList();

      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentN ? (
        <div className="edit-form">
          <h4>News</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentN.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentN.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">link</label>
              <input
                type="text"
                className="form-control"
                id="link"
                name="link"
                value={currentN.link}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <form onSubmit={handleUpload}>
                <input type="file" onChange={handleChangeimg} />
                <button disabled={!file}>upload to firebase</button>
              </form>
              <img src={currentN.url} alt="" />
            </div>
            <div>
            <label for="exampleFormControlSelect1">Categories</label>
              <select className="form-control" id="categories" value={currentN.categories}
                onChange={handleInputChange}
                name="categories">
                <option>1</option>
                <option>2</option>
                <option>3</option>
    
              </select>
            </div>

          </form>

          <button className="badge badge-danger mr-2" onClick={DeleteNews}>
            Delete
          </button>

          
          <button
            type="submit"
            className="badge badge-success"
            onClick={UpdateNews}
          >
            Update
          </button>
          <p>{message}</p>

        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a News...</p>
        </div>
      )}
    </div>
  );
};

export default News;