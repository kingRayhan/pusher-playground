import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";

const PresenceChannel = () => {
  const [isSubscribedSuccessfully, setIsSubscribedSuccessfully] =
    useState<boolean>(false);
  const [subscriptionError, setSubscriptionError] = useState<any>(null);

  const [count, setCount] = React.useState(0);
  const [users, setUsers] = React.useState([]);
  const { pusher } = useContext(AppContext);

  useEffect(() => {
    const channel = pusher.subscribe("presence-online-users");

    channel.bind("pusher:subscription_succeeded", (members: any) => {
      setCount(members.count);
      setUsers(Object.keys(members.members).map((key) => members.members[key]));
    });

    channel.bind("pusher:member_added", (member: any) => {
      setCount((count) => count + 1);
      setUsers((prev) => [...prev, member.info]);
    });

    channel.bind("pusher:member_removed", (member: any) => {
      setCount((count) => count - 1);
      setUsers((prev) =>
        prev.filter((user) => user.nickName !== member.info.nickName)
      );
    });

    channel.bind("pusher:subscription_succeeded", function (members) {
      console.log("Successfully subscribed!");
      console.log("members:", members);
      setIsSubscribedSuccessfully(true);
    });

    channel.bind("pusher:subscription_error", function (error) {
      console.log("Unable to subscribe to channel");
      console.log(error);
      setSubscriptionError(error);
    });
  }, [pusher]);

  return (
    <div>
      <h1 className="text-3xl">Online Users: {count}</h1>
      {isSubscribedSuccessfully && (
        <div className="px-2 py-2 bg-green-400 rounded-md w-max">
          <p>
            Successfully subscribed to channel <b>private-demo_channel</b>
          </p>
        </div>
      )}
      {subscriptionError && (
        <div className="max-w-3xl px-2 py-2 bg-red-400 rounded-md w-max">
          <p className="mb-2 text-xl">
            Failed to subscribed to channel <b>private-demo_channel</b>
          </p>
          <p className="w-full break-all">{subscriptionError.error}</p>
        </div>
      )}

      <ul>
        {users.map((user) => (
          <li key={user.nickName} className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-xl ">{user.nickName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PresenceChannel;
