import React, { DependencyList, useEffect, useState } from "react";
import { IShopItem } from "../components/shop-item/shopItem";
import { DataState } from "../enums/dataState";
import axios from "axios";
import { Method } from "@babel/types";

interface IDataConfig {
  method: string;
  body: any;
}

const useData = <Type>(
  url: string,
  dependincies: DependencyList,
  config: IDataConfig
) => {
  const [dataState, setDataState] = useState<DataState>(DataState.NOT_LOADED);
  //const [data, setData] = useState<Array<Type>>([]);
  const [data, setData] = useState<Array<IShopItem>>([]);

  //НОРМАЛЬНАЯ РЕАЛИЗАЦИЯ
  // useEffect(() => {
  //   axios({
  //     url: url,
  //     method: "GET",
  //   }).then((res) => {
  //     if (res.status == 200) {
  //       setData(res.data);
  //       setDataState(DataState.LOADED);
  //     } else {
  //       setDataState(DataState.ERROR);
  //     }
  //   });
  // }, dependincies);


  //ФЕЙКОВАЯ
  setTimeout(() => {
    setData([
      {
        id: 0,
        name: 'шаурма',
        imagePath: ' https://www.google.com/imgres?imgurl=https%3A%2F%2Fkurkumashaurma.by%2Fassets%2Fimages%2Fproducts%2F104%2Fmeksikanskaya-1200-dsc-5855.jpg&imgrefurl=https%3A%2F%2Fkurkumashaurma.by%2Fmenu%2Fshaurma%2Fmeksikanskaya-shaurma&tbnid=eV4UYm-2VJ9XFM&vet=12ahUKEwjdlN2_ut73AhWPtCoKHf33BekQMygCegUIARD1AQ..i&docid=VOflpwgbCvWyrM&w=1200&h=800&q=%D1%88%D0%B0%D1%83%D1%80%D0%BC%D0%B0&ved=2ahUKEwjdlN2_ut73AhWPtCoKHf33BekQMygCegUIARD1AQ',
        price: 120,
        count: 20
      }

    ]);
    setDataState(DataState.LOADED);
  }, 1000);

  return { dataState, data };
};

export default useData;
