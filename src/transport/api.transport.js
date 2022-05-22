import axios from "axios";
import { apiService } from "../services/api.service";

class ApiTransport {
    //methods
    async getAllGames(isFromCategories, ids) {
        return axios.get('http://37.79.216.230:59614/api/games/getallgames', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
          }).then((response) => {
              if (isFromCategories) {
                  const filteredGames = response.data.filter((item) => ids.includes(item.categoryId));
                  apiService._allGames$.next(filteredGames);
                  return Promise.resolve(response.data)
              } else {
                  apiService._allGames$.next(response.data);
                  return Promise.resolve(response.data)
              }
        });
    }

    writeComment(requestData) {
        return axios.post(
            'http://37.79.216.230:59614/api/comments/addcomment',
            JSON.stringify(requestData),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            }
        )
    }

    createNewAccount(requestData) {
        return axios.post(
            'http://37.79.216.230:59614/api/account/register',
            JSON.stringify(requestData),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }





    addgame(requestData) {
        return axios.post(
            'http://37.79.216.230:59614/api/games/addgame',
            JSON.stringify(requestData),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    addcategory(requestData) {
        return axios.post(
            'http://37.79.216.230:59614/api/categories/addcategory',
            JSON.stringify(requestData),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    authorization(requestData) {
        return axios.post(
            'http://37.79.216.230:59614/api/account/login',
            JSON.stringify(requestData),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    changeProfile(requestData) {
        return axios.post(
            'http://37.79.216.230:59614/api/account/changeprofile',
            JSON.stringify(requestData),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            }
        )
    }

    authValidation(token) {
        return axios.get(
            'http://37.79.216.230:59614/api/account/authcheck',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }

    getComments(gameId) {
        return axios.post(
            'http://37.79.216.230:59614/api/comments/getcommentsfromgame',
            JSON.stringify({ gameId }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    addСompetency(name) {
        return axios.post(
            'http://37.79.216.230:59614/api/account/addcompetency',
            JSON.stringify({ name: name, newCompetency: name }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            }
        )
    }

    removeСompetency(name) {
        return axios.post(
            'http://37.79.216.230:59614/api/account/removecompetency',
            JSON.stringify({ name }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            }
        )
    }

    setViewCountIntoGame(gameId, views) {
        return axios.post(
            'http://37.79.216.230:59614/api/games/addviewpointstogame',
            JSON.stringify({ gameId, views }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    getAllCategories() {
        return axios.get(
            'http://37.79.216.230:59614/api/categories/getallcategories'
        )
    }

    getAllCompetencies() {
        return axios.get(
            'http://37.79.216.230:59614/api/competencies/getallcompetencies'
        )
    }

    getProfileInfo() {
        return axios.get(
            'http://37.79.216.230:59614/api/account/getprofile',
            {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            }
        )
    }
}

export const apiTransport = new ApiTransport();