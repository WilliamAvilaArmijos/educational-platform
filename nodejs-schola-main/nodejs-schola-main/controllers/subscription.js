const HttpError = require("../utils/http-error");

const Subscription = require("../models/subscription");

exports.createSubscriptionByAdmin = async (req, res, next) => {
  const { subtotal, iva, total, paymentMethod, UserId, CourseId } = req.body;
  const UserRoleId = req.user.RoleId;

  if (UserRoleId !== 1) {
    const error = new HttpError(
      "Solo los usuarios con rol administrador pueden crear suscripciones",
      401
    );
    return next(error);
  }

  try {
    const subscription = await Subscription.create({
      subtotal,
      iva,
      total,
      paymentMethod: paymentMethod.toUpperCase(),
      UserId: parseInt(UserId),
      CourseId: parseInt(CourseId),
    });

    res.status(201).json(subscription);
  } catch (err) {
    console.error(err.message);
    const error = new HttpError(
      "Ha ocurrido un error al crear una suscripción",
      500
    );
    return next(error);
  }
};
