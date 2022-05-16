import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this.userName = [
      {
        id: 1,
        surname: "Иванов",
        firstname: "Игорь",
        secondname: "Владимирович",
        group: "РИ-480015",
      },
    ];
    this.userInfo = [
      {
        id: 1,
        phone: "8 (800) 555-35-35",
        email: "itsme@mail.ru",
        course: "2",
        institute: "ИРИТ-РТФ",
        direction: "Программная инженерия",
      },
    ];
    this._types = [
      { id: 1, name: "Дискретная математика" },
      { id: 2, name: "Алгебра и геометрия" },
      { id: 3, name: "Базы данных" },
      { id: 4, name: "Дизайн" },
      { id: 5, name: "Программирование" },
      { id: 6, name: "Менеджмент" },
      { id: 7, name: "Физика" },
      { id: 8, name: "Тестирование ПО" },
      { id: 9, name: "Аналитика" },
      { id: 10, name: "GameDev" },
      { id: 11, name: "Культура речи" },
      { id: 12, name: "Философия" },
    ];
    this._brands = [
      { id: 1, name: "Samsung" },
      { id: 2, name: "Apple" },
    ];
    this._devices = [
      {
        id: 1,
        name: "Игра",
        price: 25000,
        rating: 5,
        img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png`,
      },
      {
        id: 2,
        name: "Игра",
        price: 25000,
        rating: 5,
        img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png`,
      },
      {
        id: 3,
        name: "Игра",
        price: 25000,
        rating: 5,
        img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png`,
      },
      {
        id: 4,
        name: "Игра",
        price: 25000,
        rating: 5,
        img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png`,
      },
      {
        id: 5,
        name: "Игра",
        price: 25000,
        rating: 5,
        img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png`,
      },
      {
        id: 6,
        name: "Игра",
        price: 25000,
        rating: 5,
        img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png`,
      },
      {
        id: 7,
        name: "Игра",
        price: 25000,
        rating: 5,
        img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png`,
      },
      {
        id: 8,
        name: "Игра",
        price: 25000,
        rating: 5,
        img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png`,
      },
      {
        id: 10,
        name: "Игра",
        price: 25000,
        rating: 5,
        img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png`,
      },
      {
        id: 11,
        name: "Игра",
        price: 25000,
        rating: 5,
        img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png`,
      },
      {
        id: 12,
        name: "Игра",
        price: 25000,
        rating: 5,
        img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png`,
      },
      {
        id: 13,
        name: "Игра",
        price: 25000,
        rating: 5,
        img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png`,
      },
      {
        id: 14,
        name: "Игра",
        price: 25000,
        rating: 5,
        img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png`,
      },
      {
        id: 15,
        name: "Игра",
        price: 25000,
        rating: 5,
        img: `https://purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png`,
      },
    ];
    this._selectedType = {};
    this._selectedBrand = {};
    makeAutoObservable(this);
  }

  setUserName(userName) {
    this._userName = userName;
  }

  setUserInfo(userInfo) {
    this._userInfo = userInfo;
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setDevices(devices) {
    this._devices = devices;
  }

  setSelectedType(type) {
    this.setPage(1);
    this._selectedType = type;
  }
  setSelectedBrand(brand) {
    this.setPage(1);
    this._selectedBrand = brand;
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }

  get types() {
    return this._types;
  }

  getUserInfo() {
    return this._userInfo;
  }

  getUserName() {
    return this._userName;
  }
  get brands() {
    return this._brands;
  }
  get devices() {
    return this._devices;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
  get totalCount() {
    return this._totalCount;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }
}
