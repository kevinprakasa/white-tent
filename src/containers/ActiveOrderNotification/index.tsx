import { Notification } from "@progress/kendo-react-notification";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { getLastActiveTransaction } from "util/FirebaseAPI";

export const ActiveOrderNotification = () => {
  const [lastActiveOrder, setLastActiveOrder] = useState(null);
  const { push } = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    const lastActiveSuccessCallback = (res: any) => {
      setLastActiveOrder(res);
    };

    const lastActiveFailedCallback = (error: any) => {};

    setTimeout(
      () =>
        getLastActiveTransaction(
          lastActiveSuccessCallback,
          lastActiveFailedCallback
        ),
      1000
    );
  }, []);

  if (!lastActiveOrder || pathname === "/order-detail") return <></>;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
      }}
      onClick={() => {
        push("/order-detail");
      }}
    >
      <Notification
        type={{
          style: "warning",
          icon: true,
        }}
        onClose={() => console.log("close")}
      >
        <span>You still have an active order</span>
      </Notification>
    </div>
  );
};
