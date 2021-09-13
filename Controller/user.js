const DAO = require("../DAOManager").queries,
  Config = require("../Config"),
  ERROR = Config.responseMessages.ERROR,
  TokenManager = require("../Libs/TokenManager"),
  Models = require("../Models"),
  Bcrypt = require("bcryptjs");
let mail = require("../DAOManager").mail;
var upload = require("../Libs/uploadManager");
var path = require("path");
var { send, Emailverify } = require("../DAOManager/sendmail");
const Jwt = require("jsonwebtoken");
let fs = require("fs");

const signUp = async (payload) => {
  const {
    email,
    name,
    password,
    countryCode,
    phoneNo,
    deviceToken,
    deviceType,
  } = payload;
  let query = {
    email: email,
    // socialId: "",
  };

  var pass = Bcrypt.hashSync(password, Config.APP_CONSTANTS.SERVER.SALT);
  var number = await (countryCode + phoneNo);

  var Data = {
    password: pass,
    email: email,
    name: name,
    countryCode: countryCode,
    phoneNo: phoneNo,
    fullNo: number,
    deviceType: deviceType,
    deviceToken: deviceToken,
  };

  var result = await DAO.getDataOne(Models.Users, query, {}, {});
  console.log("dsdsdsds", result);

  if (!result) {
    var result = await DAO.saveData(Models.Users, Data);
  }
  if (result != null && result.isVerified == true) {
    throw ERROR.VERIFIED_LOGIN;
  }

  console.log("ggihgkhj", result);
  let tokenData = {
    scope: Config.APP_CONSTANTS.SCOPE.USER,
    _id: result._id,
    time: new Date(),
  };

  const Token = Jwt.sign(
    tokenData,
    Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_USER,
    {
      expiresIn: "15m",
    }
  );

  await Emailverify(email, Token);

  return {
    message: { msg: "Verification email sent" },
  };
};
const verifySignup = async (request, reply) => {
  return (tokenVerification = Jwt.verify(
    request.id,
    Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_USER,
    async (err, decoded) => {
      if (err) {
        return reply.view("verificationEmail", {
          title: "Account verification",
          errorMessage: "Your link has been expired",
          projectName: process.env.PROJECT_NAME,
        });
      } else {
        if (decoded) {
          const result = await DAO.getDataOne(
            Models.Users,
            { _id: decoded._id },
            {},
            { lean: true }
          );
          console.log("hi", result);
          if (result.isVerified == false) {
            const final = await DAO.findAndUpdate(
              Models.Users,
              { _id: decoded._id },
              { isVerified: true },
              { new: true }
            );

            console.log("00000000", final);
            return reply.view("verificationEmail", {
              title: "Account Verification",
              successMessage:
                "You have successfully verified you account please login",
              projectName: process.env.PROJECT_NAME,
            });
          } else {
            return reply.view("verificationEmail", {
              title: "Account Verified",
              successMessage: "Your account is already verified",
              projectName: process.env.PROJECT_NAME,
            });
          }
        }
      }
    }
  ));
};
const login = async (payload) => {
  try {
    const { email, password, deviceToken, deviceType } = payload;
    const query = {
      email: email,
    };

    const result = await DAO.getDataOne(Models.Users, query, {});
    if (result === null) throw ERROR.EMAIL_NOT_FOUND;
    console.log(result.password)
    if(!result.password){
      throw ERROR.SOCIAL_LOGIN_ONLY
    }

    const checkPassword = Bcrypt.compareSync(password, result.password);
    if (!checkPassword) throw ERROR.INVALID_PASSWORDMATCH;

    if (result != null && result.isVerified == false) {
      let tokenData = {
        scope: Config.APP_CONSTANTS.SCOPE.USER,
        _id: result._id,
        time: new Date(),
      };
      const Token = Jwt.sign(
        tokenData,
        Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_USER,
        {
          expiresIn: "15m",
        }
      );
      await Emailverify(email, Token);
      throw ERROR.IS_VERIFIED;
    }

    if (result) {
      response = await DAO.findAndUpdate(
        Models.Users,
        { email: email },
        {
          deviceToken: deviceToken,
          deviceType: deviceType,
          socialLoggedIn: false,
        },
        { new: true }
      );
    }

    const user = await DAO.getDataOne(Models.Users, query, { password: 0 }, {});
    let tokenData = {
      scope: Config.APP_CONSTANTS.SCOPE.USER,
      _id: result._id,
      time: new Date(),
    };
    const Token = await TokenManager.GenerateToken(
      tokenData,
      Config.APP_CONSTANTS.SCOPE.USER
    );

    return { user, Token };
  } catch (err) {
    throw err;
  }
};
const socialLogin = async (payload) => {
  const { email, name, deviceToken, deviceType, socialId, iosId, facebookId } =
    payload;


console.log(payload)

  var query = {
    iosId:iosId,
    isBlocked: false
  };

  if (email&&facebookId) {
    console.log("hi")
   query = {
      $or: [{ email: email }, { facebookId: facebookId }],
      isBlocked: false,
    };
  }
  
  if (email&&iosId) {
   query = { $or: [{ email: email }, { iosId: iosId }], isBlocked: false };
  }

 

  console.log("payload", payload);

console.log("cdsd",query)
  if (deviceType == "IOS") {
    // const query = {
    //   $or: [{ email: email }, { iosId: iosId }],
    //   isBlocked: false,
    // };
    var Data = {
      name: name,
      email: email,
      deviceType: deviceType,
      deviceToken: deviceToken,
      iosId: iosId,
      socialLoggedIn: true,
      isVerified: true,
    };
    let result = await DAO.getDataOne(Models.Users, query, {});

console.log(result)
    result !== null
      ? (user = await DAO.findAndUpdate(
          Models.Users,
          query,
          {
            deviceToken: payload.deviceToken,
            deviceType: payload.deviceType,
            isVerified: true,
            iosId: iosId,
            socialLoggedIn: true,
          },
          { new: true }
        ))
      : (user = await DAO.saveData(Models.Users, Data));


      console.log("user",user)
    let tokenData = {
      scope: Config.APP_CONSTANTS.SCOPE.USER,
      _id: user._id,
      time: new Date(),
    };
    const Token = await TokenManager.GenerateToken(
      tokenData,
      Config.APP_CONSTANTS.SCOPE.USER
    );
    return {
      user,
      Token,
    };
  } else {



    console.log("hiiiiii")
    // const query = {
    //   facebookId: facebookId,
    //   email: payload.email,
    //   isBlocked: false,
    // };
    var Data = {
      name: name,
      email: email,
      deviceType: deviceType,
      deviceToken: deviceToken,
      socialId: socialId,
      socialLoggedIn: true,
      isVerified: true,
    };

    let result = await DAO.getDataOne(Models.Users, query, {});
    result !== null
      ? (user = await DAO.findAndUpdate(
          Models.Users,
          query,
          {
            deviceToken: payload.deviceToken,
            deviceType: payload.deviceType,
            isVerified: true,
            facebookId: facebookId,
            socialLoggedIn: true,
          },
          { new: true }
        ))
      : (user = await DAO.saveData(Models.Users, Data));
    let tokenData = {
      scope: Config.APP_CONSTANTS.SCOPE.USER,
      _id: user._id,
      time: new Date(),
      // exp:Math.floor(Date.now() / 1000) + 1800
    };
    const Token = await TokenManager.GenerateToken(
      tokenData,
      Config.APP_CONSTANTS.SCOPE.USER
    );
    return {
      user,
      Token,
    };
  }
};
const changePassword = async (request, userDetails) => {
  const { newPassword, oldPassword } = request.payload;
  const result = await DAO.getDataOne(Models.Users, { _id: userDetails._id });
  var checkPassword = await Bcrypt.compareSync(oldPassword, result.password);
  if (checkPassword === false) throw ERROR.INVALID_PASSWORDMATCH;
  const pass = await Bcrypt.hashSync(
    newPassword,
    Config.APP_CONSTANTS.SERVER.SALT
  );
  const final = await DAO.findAndUpdate(
    Models.Users,
    { _id: userDetails._id },
    { password: pass },
    { new: true }
  );
  const user = await DAO.getData(
    Models.Users,
    { _id: userDetails._id },
    { password: 0 },
    {}
  );
  console.log(final);
  return { user };
};
const editProfile = async (payload, userDetails) => {
  // console.log(payload.file)
  // console.log(payload['file'])
  if (payload["file"] === undefined) {
    var number = await (payload.countrycode + payload.phoneNo);
    var Data = {
      email: payload.email,
      name: payload.fullName,
      countryCode: payload.countrycode,
      phoneNo: payload.phoneNo,
      fullNo: number,
    };
    const user = await DAO.findAndUpdate(
      Models.Users,
      { _id: userDetails._id },
      Data,
      { new: true }
    );

    return {
      user,
    };
  } else {
    let imgDetail = await upload.upload(payload);
    var number = await (payload.countrycode + payload.phoneNo);
    var Data = {
      email: payload.email,
      name: payload.fullName,
      countryCode: payload.countrycode,
      phoneNo: payload.phoneNo,
      profilePic: imgDetail,
      fullNo: number,
    };
    const user = await DAO.findAndUpdate(
      Models.Users,
      { _id: userDetails._id },
      Data,
      { new: true }
    );
    return {
      user,
    };
  }
};
const forgetPassword = async (payload) => {
  let query = {
    email: payload.email,
    socialId: "",
  };

  const result = await DAO.getDataOne(Models.Users, query);
  if (result == null) throw ERROR.EMAIL_NOT_FOUND;

  let tokenData = {
    scope: Config.APP_CONSTANTS.SCOPE.USER,
    _id: result._id,
    time: new Date(),
  };
  const Token = Jwt.sign(
    tokenData,
    Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_USER,
    {
      expiresIn: "15m",
    }
  );
  await email(payload.email, Token);
  return {
    message: "A reset password link is sent to your registered email address",
  };
};
const resetPassword = async (request, reply) => {
  console.log(request.query);
  console.log(request.payload);
  return (tokenVerification = Jwt.verify(
    request.query.id,
    Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_USER,
    async function (err, decoded) {
      if (err) {
        return reply.view("Error", { name: "Your link is expired" });
      } else {
        let query = { _id: decoded._id };
        Password = Bcrypt.hashSync(
          request.payload.newPassword,
          Config.APP_CONSTANTS.SERVER.SALT
        );
        result = await DAO.findAndUpdate(Models.Users, query, {
          password: Password,
        });
        return reply.redirect("/user/renderConfirmPage");
      }
    }
  ));
};
const forgotPasswordPageRender = async (request, reply) => {
  console.log("request", request);
  return (tokenVerification = Jwt.verify(
    request.id,
    Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_USER,
    function (err, decoded) {
      if (err) {
        return reply.view("Error", { name: "Your link is expired" });
      } else {
        return reply.view("form", { Token: request.id });
      }
    }
  ));
};
const renderConfirmPage = async (request, reply) => {
  return reply.view("form1");
};
const termsAndConditionPage = async (request, reply) => {
  return reply.view("terms");
};
const faqPage = async (request, reply) => {
  return reply.view("faq");
};
const bookMarked = async (payload, userDetails) => {
  console.log("hello");
  const { article_Id, mark } = payload;
  if (mark == 1) {
    final = await DAO.findAndUpdate(
      Models.Users,
      { _id: userDetails._id },
      { $push: { article_Id: article_Id } },
      { new: true }
    );
    console.log("hi");
  } else if (mark == 0) {
    console.log("hi there");
    final = await DAO.findAndUpdate(
      Models.Users,
      { _id: userDetails._id },
      { $pull: { article_Id: article_Id } },
      { new: true }
    );
  } else {
    throw "invalid mark";
  }

  const result = await DAO.getDataOne(Models.news, { _id: article_Id });
  if (mark == 1) {
    result.isBookmarked = true;
  } else {
    result.isBookmarked = false;
  }
  console.log(result);
  return result;
};
const bookmarkedId = async (payload, userDetails) => {
  console.log(payload);
  let query = {
    _id: { $in: payload.article_Id },
    isDeleted: false,
  };
  let final = await DAO.getData(Models.news, query, {}, {});
  return final;
};
const formSubmit = async (payload) => {
  const { fname, email, phoneNumber, about } = payload;
  let query = {
    fname,
    email,
    phoneNumber,
    about,
  };
  return { query };
};
const privacyPocily = async (request, reply) => {
  return reply.view("privacyPolicy");
};
const yourRights = async (request, reply) => {
  return reply.view("yourRights");
};
const disabilityAct = async (request, reply) => {
  return reply.view("disabilityAct");
};
const getHtml = async (query) => {
  let data = {
    Type: query.type,
  };
  let final = await DAO.getDataOne(Models.pages, data, {}, {});
  return final;
};
const logout = async (request, userDetails) => {
  let data = {
    _id: userDetails._id,
  };
  let query = {
    $unset: { deviceToken: "" },
  };
  const final = await DAO.findAndUpdate(Models.Users, data, query, {
    new: true,
  });
  return final;
};

module.exports = {
  signUp,
  verifySignup,
  login,
  socialLogin,
  changePassword,
  forgetPassword,
  editProfile,
  resetPassword,
  renderConfirmPage,
  bookMarked,
  bookmarkedId,
  formSubmit,
  forgotPasswordPageRender,
  termsAndConditionPage,
  faqPage,
  privacyPocily,
  yourRights,
  disabilityAct,
  getHtml,
  logout,
};
