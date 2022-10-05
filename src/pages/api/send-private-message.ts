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

  pusher
    .trigger("private-demo_channel", "demo_event", {
      message: body.message,
    })
    .then(() => {
      res.status(200).json({
        message: "Private message sent",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err,
      });
    });
}
