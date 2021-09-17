import React, { useState /*, useEffect */ } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import NewsDataService from "../services/NewsService";
import News from "./News"

const TutorialsList = () => {
  // const [tutorials, setTutorials] = useState([]);
  const [currentN, setCurrentN] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  /* use react-firebase-hooks */
  const [newss, loading, error] = useCollection(
    NewsDataService.getAll().orderBy("title", "asc")
  );

  /* manually listen for value events 
  const onDataChange = (items) => {
    let tutorials = [];

    items.docs.forEach((item) => {
      let id = item.id;
      let data = item.data();
      tutorials.push({
        id: id,
        title: data.title,
        description: data.description,
        published: data.published,
      });
    });

    setTutorials(tutorials);
  };

  useEffect(() => {
    const unsubscribe = TutorialDataService.getAll().orderBy("title", "asc").onSnapshot(onDataChange);

    return () => unsubscribe();
  }, []);
  */

  const refreshList = () => {
    setCurrentN(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (news, index) => {
    const { title, description, link, categories,urlimg  } = news.data();

    setCurrentN({
      id: news.id,
      title,
      description,
      link,
      categories,
      urlimg,
    });

    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>News List</h4>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Loading...</span>}
        <ul className="list-group">
          {!loading &&
            newss &&
            newss.docs.map((news, index /* tutorials.map */) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(news, index)}
                key={news.id}
              >
                
                <div className="card" >
  <img src={news.data().urlimg} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{news.data().title}</h5>
    <p className="card-text">{news.data().categories}</p>

    <p className="card-text">{news.data().description}</p>
    <a href={news.data().link} className="btn btn-primary">Go somewhere</a>
  </div>
</div>
                
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentN ? (
          <News ele={currentN} refreshList={refreshList} />
        ) : (
          <div>
            <br />
            <p>Please click on a News...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialsList;
