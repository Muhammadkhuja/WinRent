const { errorHandler } = require("../helpers/error_handler");
const Owner = require("../models/owner.models");
const config = require("config");
const jwtService = require("../services/jwt.service");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("../services/mail.service");
const { ownerValidation } = require("../validation/owner.validation");

const addNewOwner = async (req, res) => {
  try {
    const { error, value } = ownerValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const {
      full_name,
      phone,
      email,
      password,
      address,
      is_active,
      created_at,
    } = value;

    const hashedPassword = bcrypt.hashSync(password, 7);
    console.log(hashedPassword);

    const activation_link = uuid.v4();
    const newOwner = await Owner.create({
      full_name,
      phone,
      email,
      password: hashedPassword,
      address,
      created_at,
      is_active,
      activation_link,
    });

    res.status(201).send({
      message: "Yangi foydalanuvchi qo'shildi",
      newOwner,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const registrOwners = async (req, res) => {
  try {
    const { error, value } = ownerValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const {
      full_name,
      phone,
      email,
      password,
      address,
      is_active,
      created_at,
    } = value;
    const hashedPassword = bcrypt.hashSync(password, 7);
    const owner = await Owner.create({
      full_name,
      phone,
      email,
      password: hashedPassword,
      address,
      created_at,
      is_active,
    });
    const activation_link = uuid.v4();

    await mailService.sendActivationMail(
      owner.email,
      `${config.get("api_url")}/api/owner/activate/${activation_link}`
    );
    const payload = {
      id: owner.id,
      email: owner.email,
      is_active: owner.is_active,
      role: "owner",
    };

    const tokens = jwtService.generatorTokens(payload);

    await Owner.update(
      { refresh_token: tokens.refreshtoken },
      { where: { email } }
    );

    res.cookie("refreshTokenowner", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });
    res.status(201).send({
      message:
        "Yangi foydalanuvchi qo'shildi. Akkauntni foallashtirish uchun pochtaga o'ting",
    });
    console.log(tokens);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const ownerId = req.owner.id;
    console.log(ownerId);

    const { password, new_password, confirm_password } = req.body;

    const owner = await Owner.findByPk(ownerId);
    if (!owner) throw ApiError.notFound("Foydalanuvchi topilmadi");

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) throw ApiError.badRequest("Eski parol notogri");

    if (new_password !== confirm_password) {
      throw ApiError.badRequest("Yangi parollar bir xil emas");
    }

    const hashedPassword = await bcrypt.hash(new_password, 7);

    owner.password = hashedPassword;
    await owner.save();

    res.status(200).send({ message: "Parol muvaffaqiyatli yangilandi" });
  } catch (error) {
    next(error);
  }
};

const findAllOwners = async (req, res) => {
  try {
    const owners = await Owner.findAll();
    res.status(200).send({ message: "Owners found", owners });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findByPk(id);
    if (!owner) {
      return res.status(400).send({ message: "Foydlanuvchi yo'gu qaren e" });
    }
    res.status(200).send({ owner });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = ownerValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const {
      full_name,
      phone,
      email,
      password,
      address,
      is_active,
      created_at,
    } = value;
    const updatedOwner = await Owner.update(
      {
        full_name,
        phone,
        email,
        password,
        address,
        is_active,
        created_at,
      },
      { where: { id }, returning: true }
    );
    if (!updatedOwner) {
      return res.status(400).send({ message: "Foydlanuvchi yo'gu qaren e" });
    }
    res.status(200).send({ updatedOwner: updatedOwner[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOwner = await Owner.destroy({ where: { id } });
    if (!deletedOwner) {
      return res.status(400).send({ message: "Foydlanuvchi yo'gu qaren e" });
    }
    res.status(200).send({ deletedOwner });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginowner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const owner = await Owner.findOne({
      where: { email },
    });

    if (!owner) {
      return res
        .status(400)
        .send({ message: "Email number yoki password noto'g'ri" });
    }
    const valiPassword = bcrypt.compareSync(password, owner.password);
    if (!valiPassword) {
      return res.status(400).send({ message: "Email yoki password noto'gri " });
    }

    const payload = {
      id: owner.id,
      email: owner.email,
      is_active: owner.is_active,
      role: "owner",
    };

    const tokens = jwtService.generatorTokens(payload);

    await Owner.update(
      { refresh_token: tokens.refreshtoken },
      { where: { email } }
    );

    res.cookie("refreshTokenowner", tokens.refreshtoken, {
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

const logoutowner = async (req, res) => {
  try {
    const { refreshTokenowner } = req.cookies;

    if (!refreshTokenowner) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi ?" });
    }

    const owner = await Owner.findOne({
      where: { refresh_token: refreshTokenowner },
    });

    if (!owner) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }

    await Owner.update({ refresh_token: " " }, { where: { id: owner.id } });

    res.clearCookie("refreshTokenowner");
    res.send({ message: "Successfully logged out" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshTokenowner = async (req, res) => {
  try {
    const { refreshTokenowner } = req.cookies;

    if (!refreshTokenowner) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi ?" });
    }
    const owner = await Owner.findOne({
      where: { refresh_token: refreshTokenowner },
    });

    if (!owner) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }
    const payload = {
      id: owner._id,
      email: owner.email,
      role: owner.role,
      role: "owner",
    };

    const tokens = jwtService.generatorTokens(payload);
    owner.refresh_token = tokens.refreshtoken;
    await owner.save();

    res.cookie("refreshTokenowner", tokens.refreshtoken, {
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

const activateOwner = async (req, res) => {
  try {
    const owner = await Owner.findOne({ activation_link: req.params.link });
    if (!owner) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }
    owner.is_active = true;
    await owner.save();
    res.send({
      message: "Foydalanuvchi falolashtirlidi",
      status: owner.is_active,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  updatePassword,
  registrOwners,
  activateOwner,
  loginowner,
  logoutowner,
  refreshTokenowner,
  addNewOwner,
  findAllOwners,
  findByIdOwner,
  updateOwner,
  deleteOwner,
};
