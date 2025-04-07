const { errorHandler } = require("../helpers/error_handler");
const User = require("../models/user.models");
const config = require("config");
const jwtService = require("../services/jwt.service");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("../services/mail.service");
const { userValidation } = require("../validation/user.validation");

const addNewUser = async (req, res) => {
  try {
    const { error, value } = userValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const {
      full_name,
      passport,
      phone,
      email,
      password,
      address,
      is_active,
      registered_at,
    } = value;
    const hashedPassword = bcrypt.hashSync(password, 7);
    const activation_link = uuid.v4();
    const newUser = await User.create({
      full_name,
      passport,
      phone,
      email,
      password: hashedPassword,
      address,
      is_active,
      registered_at,
      activation_link,
    });

         await mailService.sendActivationMail(
           newUser.email,
           `${config.get("api_url")}/api/user/activate/${activation_link}`
         );
         res.status(201).send({
           message:
             "Yangi foydalanuvchi qo'shildi. Akkauntni foallashtirish uchun pochtaga o'ting",
           newUser,
         });

  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send({ message: "All Users ", users });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.status(200).send({ user });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateUser = async (req, res) => {  
  const { id } = req.params;
  try {
    const { error, value } = userValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const {
      full_name,
      passport,
      phone,
      email,
      password,
      address,
      is_active,
      registered_at,
    } = value;
    const updatedUser = await User.update(
      {
        full_name,
        passport,
        phone,
        email,
        password,
        address,
        is_active,
        registered_at,
      },
      { where: { id }, returning: true }
    );
    res.status(200).send({ updatedUser: updatedUser[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.destroy({ where: { id } });
    res.status(200).send({ deletedUser });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Email number yoki password noto'g'ri" });
    }
    const valiPassword = bcrypt.compareSync(password, user.password);
    if (!valiPassword) {
      return res.status(400).send({ message: "Email yoki password noto'gri " });
    }

    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
    };

    const tokens = jwtService.generatorTokens(payload);

    await User.update(
      { refresh_token: tokens.refreshtoken },
      { where: { email } }
    );

    res.cookie("refreshToken", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.send({
      message: "Tizimga hush kelibsiz",
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logoutuser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi ?" });
    }

    const user = await User.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }

    await User.update({ refresh_token: " " }, { where: { id: user.id } });

    res.clearCookie("refreshToken");
    res.send({ message: "Successfully logged out" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshTokenuser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi ?" });
    }
    const user = await User.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const tokens = jwtService.generatorTokens(payload);
    user.refresh_token = tokens.refreshtoken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });
    res.send({
      message: "Tokenlar yangilandi",
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const activateuser = async (req, res) => {
  try {
    const user = await User.findOne({ activation_link: req.params.link });
    if (!user) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }
    user.is_active = true;
    await user.save();
    res.send({
      message: "Foydalanuvchi falolashtirlidi",
      status: user.is_active,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  activateuser,
  loginuser,
  logoutuser,
  refreshTokenuser,
  addNewUser,
  findAllUsers,
  findByIdUser,
  updateUser,
  deleteUser,
};
