"use client";

import { Provider } from "react-redux";
import { appStore } from "../redux/store/store";
import CareerList from "./careerlist";

export default function Career() {
  return (
    <Provider store={appStore}>
      <CareerList />
    </Provider>
  );
}
