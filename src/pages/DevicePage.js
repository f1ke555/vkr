import React, {useContext, useEffect, useRef, useState} from "react";
import { apiService } from "../services/api.service";
import { useLocation } from "react-router-dom";
import { Unity } from "react-unity-webgl";
import {apiTransport} from "../transport/api.transport";
import {Context} from "../index";
import {Chip} from "@mui/material";

const DEFAULT_STATE = {
  mainData: {
    category: '',
    description: '',
    name: '',
    metrics: null,
    id: 0,
    savedData: null,
    views: 0,
    competencies: null,
  },
  commentText: '',
  comments: [],

}



function DevicePage() {
  const [state, setState] = useState(DEFAULT_STATE);
  const location = useLocation();
  const { user } = useContext(Context);

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

  // const unityRef = useRef(null);
  // useEffect(() => {
  //   if (unityRef.current) {
  //     console.log('fsaf')
  //     unityRef.current.htmlCanvasElementReference.tabIndex = 1;
  //   }
  // }, [unityRef]);

  return (
    <div className="container">
      <h1 className="mt-4">{state.mainData.name}</h1>
      { state.mainData.name &&
        <Unity
            tabIndex={9999}
            width="500px"
            height="350px"
            onProgress={onProgress}
            src={`/games/${state.mainData.name}/Build/v3.json`}
            loader={`/games/${state.mainData.name}/Build/UnityLoader.js`}
        />
      }
      <div className="d-flex justify-content-between mt-1">
        <div><span className="color-text">Разработчик/</span>{`${state.mainData.name}`}</div>
        <div><span className="color-text">Просмотров:</span>{`${state.mainData.views + 2}`}</div>
      </div>
      <h2 className="color-text pt-4">Описание</h2>
      <h4
        className="mt-4"
        style={{ width: "100%", height: "15%"}}
      >
        {state.mainData.description}
      </h4>
      { state.mainData.competencies && state.mainData.competencies.map((item) => {
        return (
            <Chip className="custom-chip mt-4" label={item.name} />
        )
      })}
      <div className="d-flex">
        <div>
          <label className="pt-4">

            {sessionStorage.getItem('token') ?
                <div>
                  <h2 className="color-text">Комментарий:</h2>
                  <textarea
                      id="test"
                      className="form-control input-find mt-3 input-com"
                      name="comment"
                      value={state.commentText}
                      onChange={handleChange}
                  ></textarea>
                  <button className="btn btn-primary mt-4" onClick={addComment}>Отправить</button>
                </div>
                :
                <div className="no-comment">Вы не можете оставлять комментарии, пока Вы не авторизованы. Выполните <a href="http://localhost:3000/login">вход</a> или <a href="http://localhost:3000/registration">зарегистрируйтесь</a></div>
            }

          </label>
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
