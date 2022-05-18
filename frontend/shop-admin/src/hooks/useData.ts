import React, { DependencyList, useEffect, useRef, useState } from "react";
import { IShopItem } from "../components/admin-shop-item/adminShopItem";
import { DataState } from "../enums/dataState";
import axios, { AxiosPromise } from "axios";


const useData = <Type>(request: () => AxiosPromise, dependencies: DependencyList = []) => {
  const [dataState, setDataState] = useState<DataState>(DataState.NOT_LOADED);
  const [data, setData] = useState<Array<Type>>([]);


  const updateData = () => {
    request().then((res) => {
      if (res.status == 200) {
        setData(res.data);
        setDataState(DataState.LOADED);
      }
      else setDataState(DataState.ERROR)
    }).catch((e) => setDataState(DataState.ERROR));
  }

  useEffect(() => {
    updateData()
  }, dependencies)

  return { 
    dataState,
     data,
      dataHandler: ((value: React.SetStateAction<Type[]>) => setData(value)),
      updateData: updateData 
    };
};

export default useData;

