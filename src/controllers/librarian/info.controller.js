/**
 * =====================================================================
 * * INFO CONTROLLER
 * =====================================================================
 * This controller is for querying librarian related information
 * =====================================================================
 */

const db = require("../../models");
const {
  checkAuthorization,
  dataResponse,
  errResponse,
  emptyDataResponse,
} = require("../../helper/controller.helper");
const bcrypt = require("bcrypt");

// % Gets the information of the currently logged in user.
// % ROUTE: /ebasa/v1/librarian/info
exports.getInfo = (req, res, next) => {
  // Check if user logged in or logged in but not Librarian

  let v = checkAuthorization(req, res, "Librarian");
  if (v != null) return v;

  db.User.findOne({
    where: {
      user_id: req.user.user_id,
    },
    attributes: [
      "user_id",
      "full_name",
      "email_address",
      "contact_number",
      "profile_pic",
      "user_type",
      "status",
    ],
    include: [
      {
        model: db.User,
        attributes: ["user_id", "full_name", "user_type", "status"],
        as: "created_by_admin",
      },
      {
        model: db.User,
        attributes: ["user_id", "full_name", "user_type", "status"],
        as: "updated_by_admin",
      },
    ],
  })
    .then((data) =>
      dataResponse(
        res,
        data,
        "A Record has been identified",
        "No Record has been identified"
      )
    )
    .catch((err) => errResponse(res, err));
};

// % Updates the information of the currently logged in user.
// % ROUTE: /ebasa/v1/librarian/info
exports.updateInfo = (req, res, next) => {
  req.body["updated_by"] = req.user.user_id;
  req.body.full_name = "";

  // Check if user logged in or logged in but not Librarian
  let v = checkAuthorization(req, res, "Librarian");
  if (v != null) return v;

  db.User.findByPk(req.user.user_id)
    .then((result) => {
      // If no result return empty response
      if (result == null)
        emptyDataResponse(res, "No Record has been identified");

      // Update Information from request body
      db.User.update(req.body, {
        where: {
          user_id: req.user.user_id,
        },
      })
        .then(() => {
          // Get Super Admin info
          db.User.findByPk(req.user.user_id, {
            attributes: [
              "user_id",
              "first_name",
              "middle_name",
              "last_name",
              "full_name",
              "email_address",
              "contact_number",
              "user_type",
              "status",
              "updated_by",
            ],
          })
            .then((data) =>
              dataResponse(
                res,
                data,
                "A Record has been successfully updated",
                "No changes in the record"
              )
            )
            .catch((err) => errResponse(res, err));
        })
        .catch((err) => errResponse(res, err));
    })
    .catch((err) => errResponse(res, err));
};

// % Change the password of the currently logged in user.
// % ROUTE: /ebasa/v1/librarian/info/change-password
exports.changePassword = (req, res, next) => {
  // Check authorization first
  let v = checkAuthorization(req, res, "Librarian");
  if (v != null) return v;

  // Get password from req.body
  const new_password = bcrypt.hashSync(req.body.new_password, 10);
  console.log({
    user_id: req.user.user_id,
    password: req.body.new_password,
    hashed: new_password,
  });
  // Find user and check password
  db.User.findByPk(req.user.user_id, { attributes: ["user_id", "password"] })
    .then((result) => {
      if (result) {
        bcrypt.compare(
          req.body.current_password,
          result.password,
          (err, hasResult) => {
            // Display error if exists
            if (err) console.log(err);

            // If no result then send empty reponse
            if (!hasResult)
              return emptyDataResponse(res, "Invalid details or password");

            // Else update user password
            db.User.update(
              { password: new_password },
              { where: { user_id: req.user.user_id } }
            )
              .then((data) =>
                dataResponse(
                  res,
                  data,
                  "Password has been changed successfully",
                  "Password has been changed successfully"
                )
              )
              .catch((err) => errResponse(res, err));
          }
        );
      }
    })
    .catch((err) => errResponse(res, err));
};

// % Change the profile pic of the currently logged in user.
// % ROUTE: /ebasa/v1/librarian/info/change-profile-pic
exports.changeProfilePic = (req, res, next) => {
  console.log(req.file);
  req.body.profile_pic = req.file != undefined ? req.file.filename : "";

  // Check if user logged in or logged in but not Librarian
  let v = checkAuthorization(req, res, "Librarian");
  if (v != null) return v;

  db.User.findByPk(req.user.user_id)
    .then((result) => {
      // If no result return empty response
      if (result == null)
        emptyDataResponse(res, "No Record has been identified");

      // Update Information from request body
      db.User.update(req.body, {
        where: { user_id: req.user.user_id },
      })
        .then(() => {
          // Get Librarian info
          db.User.findByPk(req.user.user_id, {
            attributes: ["user_id", "full_name", "status", "profile_pic"],
          })
            .then((data) =>
              dataResponse(
                res,
                data,
                "Profile Pic has been successfully updated",
                "No changes in the record"
              )
            )
            .catch((err) => errResponse(res, err));
        })
        .catch((err) => errResponse(res, err));
    })
    .catch((err) => errResponse(res, err));
};
