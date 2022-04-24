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
  const [data, setData] = useState<Array<Type>>([]);

  useEffect(() => {
    axios({
      url: url,
      method: "GET",
    }).then((res) => {
      if (res.status == 200) {
        setData(res.data);
        setDataState(DataState.LOADED);
      } else {
        setDataState(DataState.ERROR);
      }
    });
  }, dependincies);

  return { dataState, data };
};

export default useData;
