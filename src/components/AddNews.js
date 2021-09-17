import React, { useState } from "react";
import { storage } from "../firebase";

import NewsDataService from "../services/NewsService";

const AddNews = () => {
  const initialNewsState = {
    title: "",
    description: "",
    link: "",
    img : "",
    categories: "",
    urlimg : "",
  };
  const [news, setNews] = useState(initialNewsState);
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

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
 /* const onUploadSubmission = e => {
    e.preventDefault(); // prevent page refreshing
      const promises = [];
      files.forEach(file => {
       const uploadTask = 
        firebase.storage().ref().child(`your/file/path/${file.name}`).put(file);
          promises.push(uploadTask);
          uploadTask.on(
             firebase.storage.TaskEvent.STATE_CHANGED,
             snapshot => {
              const progress = 
               ( (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                 if (snapshot.state === firebase.storage.TaskState.RUNNING) {
                  console.log(`Progress: ${progress}%`);
                 }
               },
               error => console.log(error.code),
               async () => {
                 const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                  // do something with the url
                }
               );
             });
         Promise.all(promises)
          .then(() => alert('All files uploaded'))
          .catch(err => console.log(err.code));
   }*/
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNews({ ...news, [name]: value });
  };

  const saveNews = () => {
    var data = {
      title: news.title,
      description: news.description,
      link: news.link,
      categories: news.categories,
      urlimg  : url,
    };

    NewsDataService.create(data)
      .then(() => {
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newNews = () => {
    setNews(initialNewsState);
    setSubmitted(false);
  };

  return (
    <div>
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newNews}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={news.title}
                onChange={handleInputChange}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={news.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="link">link</label>
              <input
                type="text"
                className="form-control"
                id="link"
                required
                value={news.link}
                onChange={handleInputChange}
                name="link"
              />
            </div>
            <div>
              <form onSubmit={handleUpload}>
                <input type="file" onChange={handleChangeimg} />
                <button disabled={!file}>upload to firebase</button>
              </form>
              <img src={url} alt="" />
            </div>
            <div className="form-group">
              <label for="exampleFormControlSelect1">Categories</label>
              <select className="form-control" id="categories" value={news.categories}
                onChange={handleInputChange}
                name="categories">
                <option>1</option>
                <option>2</option>
                <option>3</option>
    
              </select>
            </div>

            <button onClick={saveNews} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNews;
