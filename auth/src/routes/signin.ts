import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "@inovit-bd/ms-common";
import { validateRequest } from "@inovit-bd/ms-common";
import { User } from "../models/user";
import { Password } from "../utils/password";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Enter a valid email address!"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage(
        "Enter password with minimum 4 charecters and maximum of 20 charecters!"
      ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // Request body data
    const { email, password } = req.body;

    // Find user by email
    const existingUser = await User.findOne({ email });

    // If no user found
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials!");
    }

    // Check password
    const isValidPassword = await Password.compare(
      existingUser.password,
      password
    );

    // If password do not match
    if (!isValidPassword) {
      throw new BadRequestError("Invalid credentials!");
    }

    // Create JWT
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    // Set te token into session
    req.session = { jwt: userJwt };

    // Send success response
    return res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
