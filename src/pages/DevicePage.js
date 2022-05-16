import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { apiService } from "../services/api.service";
import { useLocation } from "react-router-dom";
import { Unity } from "react-unity-webgl";
import {apiTransport} from "../transport/api.transport";

const DEFAULT_STATE = {
  mainData: {
    category: '',
    description: '',
    name: '',
    metrics: null,
    id: 0,
    savedData: null,
    views: 0,
  },
  commentText: '',
  comments: []
}

function DevicePage() {
  const [state, setState] = useState(DEFAULT_STATE);
  const location = useLocation();

  useEffect(() => {
    // apiService._allGames$.subscribe((games) => setState(games))
    setState({
      mainData: location.state.gameInfo
    })

    apiTransport.getComments(location.state.gameInfo.id)
        .then(response => { setState((prev) => ({...prev, comments: response.data }))})
  }, [location.state])

  const addComment = () => {
    setState((prev) => ({
      ...prev,
      comments: [
        ...prev.comments,
        {
          gameId: state.mainData.id,
          author: sessionStorage.getItem('username'),
          text: state.commentText,
          date: new Date().toLocaleString() + "",
        }
      ]
    }))

    apiService.writeComment({
      comment: state.commentText,
      author : sessionStorage.getItem('username'),
      gameId : state.mainData.id
    });
  }

  const onProgress = (e) => {
    console.log(e)
  }

  const handleChange = (e) => {
    setState((prev) => ({...prev, commentText: e.target.value }))
  }

  return (
    <div className="container">    
      <h1 className="mt-4 color-text">{state.mainData.name}</h1>
      { state.mainData.name &&
        <Unity
            width="500px"
            height="350px"
            onProgress={onProgress}
            src={`/games/${state.mainData.name}/Build/v3.json`}
            loader={`/games/${state.mainData.name}/Build/UnityLoader.js`}
        />
      }
      <div className="d-flex justify-content-between">
        <div><span className="color-text">Разработчик/</span>{`${state.mainData.name}`}</div>
        <div className><span className="color-text">Просмотров:</span>{`${state.mainData.views}`}</div>
      </div>
      <h2 className="color-text pt-4">Описание</h2>
      <h4
        className="mt-4"
        style={{ width: "100%", height: "15%"}}
      >
        {state.mainData.description}
      </h4>
      <div className="d-flex">
        <div>
          <label className="pt-4">
            <h2 className="color-text">Комментарий:</h2>
            <input
              className="form-control input-find mt-3 input-com"
              name="comment"
              value={state.commentText}
              onChange={handleChange}
            />
          </label>
          <div>
            <button className="btn btn-primary mt-4" onClick={addComment}>Отправить</button>
          </div>
        </div>
        <div className="commentary">
          {state.comments && state.comments.map(comment => {
            return (
                <div className="mt-4" key={comment.gameId}>
                  <span className="text-primary mr-3">{comment.author} </span>
                  <span className="custom-label">{comment.date} </span>
                  <p>{comment.text}</p>
                </div>
            )
          })}
        </div>

      </div>
    </div>
  );
}

export default DevicePage;
