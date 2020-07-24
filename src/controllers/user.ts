module.exports = function(server, db) {
  server.post("/users", async (req, res) => {
    const username = req.body.username;
    const user = await db.User.create({username});
    res.json(user);
  });
}
