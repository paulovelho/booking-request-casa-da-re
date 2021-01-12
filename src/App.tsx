import React, { ReactElement } from "react";

import {
  BookingRequest,
} from './features';

import './App.scss';

export default function App(): ReactElement {
  document.title = "Quero ficar com a Rê!";

  return (
    <BookingRequest />
  );
}
