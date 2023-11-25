import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "@inovit-bd/ms-common";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { validateRequest } from "@inovit-bd/ms-common";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Enter a valid email address!"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage(
        "Enter password with minimum 4 charecters and maximum of 20 charecters!"
      ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // Request body data
    const { email, password } = req.body;

    // Check user with email exists
    const userExist = await User.findOne({ email });

    // response for existing user
    if (userExist) {
      throw new BadRequestError("Email already in use!");
    }

    // If User with email does not exists
    const user = User.build({ email, password });
    await user.save();

    // Create JWT
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    // Set te token into session
    req.session = { jwt: userJwt };

    // Send success response
    return res.status(201).send(user);
  }
);

export { router as signupRouter };
