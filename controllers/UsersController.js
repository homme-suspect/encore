const prisma = require("../configue/prisma");
const { hashPassword } = require("../utils/bcrypt");

class UsersController {
  
    async getMyProfile(req, res) {
      const user = req.user;
      return res.status(200).send(user);
    
  }
  // app.get (/users)
  async index(req, res) {
    const users = await prisma.user.FindMany();
    return res.status(200).send(users);
  }

  // app.post (/users)
  async store(req, res) {
    try {
      const body = req.body;
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: await hashPassword(body.password),
        },
      });
      return res.status(201).send(user);
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }
  // app.get (/users/:id)
  async show(req, res) {
    try {
      const id = req.params.id;
      const user = await prisma.user.find((user) => user.id === parseInt(id));

      if (user === undefined) {
        return res.status(404).send("User not found");
      }

      return res.status(200).send(user);
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        status: "Error",
        message: "Internal server error",
      });
    }
  }

  // app.put (/users/:id)
  update(req, res) {
    const id = req.params.id;
    const body = req.body;

    let user = users.find((user) => user.id === parseInt(id));

    if (user === undefined) {
      return res.status(404).send("User not found");
    }

    user = body;

    return res.status(200).send(user);
  }

  // app.delete (/users/:id)
  destroy(req, res) {
    const id = req.params.id;

    const user = users.find((user) => user.id === parseInt(id));

    if (user === undefined) {
      return res.status(404).send("User not found");
    }

    users = users.filter((user) => user.id !== parseInt(id));

    return res.status(204);
    // return res.status(200).send(users);
  }
}

module.exports = new UsersController();
