import Pusher from "pusher-js";
import React, { PropsWithChildren } from "react";

interface AppContextProps {
  pusher: Pusher;
}

export const AppContext = React.createContext<AppContextProps>(null);

const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  let pusher: Pusher;

  if (typeof window !== "undefined") {
    pusher = new Pusher("06d21999dd24676c7d71", {
      cluster: "ap2",
      channelAuthorization: {
        endpoint: "/api/pusher-auth",
        transport: "ajax",
      },
    });
  }

  return (
    <AppContext.Provider value={{ pusher }}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
