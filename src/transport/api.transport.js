import axios from "axios";
import { apiService } from "../services/api.service";

class ApiTransport {
    //methods
    async getAllGames(isFromCategories, ids) {
        return axios.get('https://37.79.216.230:44396/api/games/getallgames', {
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
            'https://37.79.216.230:44396/api/comments/addcomment',
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
            'https://37.79.216.230:44396/api/account/register',
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
            'https://37.79.216.230:44396/api/account/login',
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
            'https://37.79.216.230:44396/api/games/addgame',
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
            'https://37.79.216.230:44396/api/categories/addcategory',
            JSON.stringify(requestData),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }


    authValidation(token) {
        return axios.get(
            'https://37.79.216.230:44396/api/account/authcheck',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }

    getComments(gameId) {
        return axios.post(
            'https://37.79.216.230:44396/api/comments/getcommentsfromgame',
            JSON.stringify({ gameId }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    getAllCategories() {
        return axios.get(
            'https://37.79.216.230:44396/api/categories/getallcategories'
        )
    }

    getProfileInfo() {
        return axios.get(
            'https://37.79.216.230:44396/api/account/getprofile',
            {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            }
        )
    }
}

export const apiTransport = new ApiTransport();