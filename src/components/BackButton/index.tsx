import React from "react";
import { useHistory } from "react-router";

import BackImg from "assets/left-chevron.png";

const BackButton: React.FC = () => {
  const history = useHistory();

  return (
    <div className="back-button-component-wrap">
      <img
        className="left-chevron"
        src={BackImg}
        alt="left-chevron"
        onClick={() => history.goBack()}
      />
    </div>
  );
};

export default BackButton;
