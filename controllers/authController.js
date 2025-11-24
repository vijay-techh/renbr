import generateJWT from "../utils/generateJWT.js";

export function googleCallbackHandler(req, res) {
  // Passport attaches user in req.user
  const user = req.user;

  const token = generateJWT({
    id: user.id,
    email: user.email,
  });

  // For now, just send as JSON (later you can redirect to frontend with token)
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  });
}

export function meHandler(req, res) {
  res.json({ user: req.user });
}
