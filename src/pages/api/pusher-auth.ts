// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  // get body
  const body = req.body;
  const socket_id = body.socket_id;
  const channel_name = body.channel_name;

  if (!req.cookies.userId || !req.cookies.nickName) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const authResponse = pusher.authorizeChannel(socket_id, channel_name, {
    user_id: req.cookies.userId,
    user_info: {
      nickName: req.cookies.nickName,
    },
  });

  res.status(200).json(authResponse);
}
