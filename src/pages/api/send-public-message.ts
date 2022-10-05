import type { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1486630",
  key: "06d21999dd24676c7d71",
  secret: "43db56edd06769a7e048",
  cluster: "ap2",
  useTLS: true,
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = req.body;

  pusher.trigger("demo_public_channel", "demo_event", {
    message: body.message,
  });

  res.status(200).json({
    message: "Message Sent",
  });
}
