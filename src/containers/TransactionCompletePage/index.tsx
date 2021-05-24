import React from "react";

import { Button } from "@progress/kendo-react-buttons";
import { Card, CardTitle } from "@progress/kendo-react-layout";

import "./transactionCompletePageStyle.scss";
import { useHistory, useParams } from "react-router-dom";
import TransactionInfo from "assets/transaction-info.png";

const TransactionCompletePage: React.FC = () => {
  const { id }: { id: string } = useParams();
  const history = useHistory();

  return (
    <div className="transaction-complete-page-container">
      <div className="transaction-successful-wrap">
        <h1>Transaction Successful!</h1>
        <div className="infographic-wrap">
          <img
            src={TransactionInfo}
            alt="transaction-info"
            style={{ width: "35vh" }}
          />
        </div>
      </div>
      <div className="transaction-id-wrap">
        <p>Here is your transaction ID</p>
        <Card className="transaction-id-card">
          <CardTitle className="transaction-id">{id}</CardTitle>
        </Card>
      </div>
      <div className="transaction-cta-wrap">
        <Button
          look={"flat"}
          className="transaction-cta"
          onClick={() => {
            window.location.replace("/");
          }}
        >
          Finish Transaction
        </Button>
      </div>
    </div>
  );
};

export default TransactionCompletePage;
