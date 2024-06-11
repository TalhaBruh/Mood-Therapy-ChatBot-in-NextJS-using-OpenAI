"use server";
import openAI from "openai";
import User from "@/models/UserSchema";
import Session from "@/models/SessionSchema";
import connectDB from "@/db/db";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "./authentication";
import {
  UserLoginType,
  UserType,
  UserUpdateType,
  sessionRatingType,
} from "./types";

// OpenAI API
const openai = new openAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateResponseAction = async (chatMessages: any) => {
  const { messages, gptResponse } = chatMessages;
  const lastMessage = messages.length - 1;
  messages[lastMessage].content += `. Generate a ${gptResponse} response.`;
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a smart AI therapist specialized in therapy-related conversations. Please share your thoughts, feelings, or concerns related to therapy. Note: This therapist is dedicated to therapy-related discussions. Daily work routines or tasks unrelated to therapy may not elicit a response. Documentation: the AI therapist to specialize in therapy-related conversations, encouraging users to share thoughts, feelings, or concerns relevant to therapy. It explicitly states that the therapist may not respond to daily work routines or tasks that are unrelated to therapy, emphasizing its focus on therapeutic dialogue.`,
        },
        ...messages,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    return response.choices[0].message;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Hashing Password
const hashPassword = async (password: string): Promise<string> => {
  try {
    // Generate a salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    // Handle error
    console.error("Error hashing password:", error);
    throw new Error("Error hashing password");
  }
};

// Verifying Password
const verifyPassword = async (
  userPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(userPassword, hashedPassword);
};

export const registerUserAction = async (
  values: UserType
): Promise<UserType | { error: string }> => {
  try {
    // Connecting to the DB
    await connectDB();

    // Checking if a user with the same name already exists
    const userName = await User.findOne({ userName: values.userName });
    if (userName) {
      return { error: "User name must be unique" };
    }

    // Checking if a user with the same email already exists
    const userEmail = await User.findOne({ email: values.email });
    if (userEmail) {
      return { error: "User email must be unique" };
    }

    // Hashing the password
    const hashedPassword = await hashPassword(values.password);

    // Creating the User
    const user = await User.create({ ...values, password: hashedPassword });

    // Converting the Mongoose document to a simple object
    const simpleUser = user.toObject({ getters: true, virtuals: false });
    delete simpleUser.__v;
    delete simpleUser._id;
    return simpleUser;
  } catch (error) {
    console.log(error);
    return { error: "" };
  }
};

export const loginUserAction = async (
  values: UserLoginType
): Promise<UserType | { error: string }> => {
  try {
    // Connecting to the DB
    await connectDB();

    // Checking if a user with this name exists
    const user = await User.findOne({ userName: values.userName });
    if (!user) {
      return { error: "Invalid username" };
    }
    const isPasswordValid = await verifyPassword(
      values.password,
      user?.password
    );
    if (!isPasswordValid) {
      return { error: "Invalid password" };
    }

    // Creating Session
    await createSession(user.userName, user.mood, user.session.toString());

    // Converting the Mongoose document to a simple object
    const simpleUser = user.toObject({ getters: true, virtuals: false });
    delete simpleUser.__v;
    delete simpleUser._id;
    return simpleUser;
  } catch (error) {
    console.log(error);
    return { error: "" };
  }
};

// Update User Action
export const updateUserAction = async (
  values: UserUpdateType
): Promise<UserType | { error: string }> => {
  try {
    // Connecting to the DB
    await connectDB();

    // Finding the specific user and updating the mood & session values
    const user = await User.findOneAndUpdate(
      { userName: values.userName },
      {
        mood: values.mood,
        session: values.session,
        gptResponse: values.gptResponse,
      },
      { new: true }
    );
    if (!user) {
      return {
        error: "User not found",
      };
    }

    // Converting the Mongoose document to a simple object
    const simpleUser = user.toObject({ getters: true, virtuals: false });
    delete simpleUser.__v;
    delete simpleUser._id;
    return simpleUser;
  } catch (error) {
    console.log(error);
    return { error: "" };
  }
};

export const sessionRatingAction = async (
  values: sessionRatingType
): Promise<sessionRatingType | { error: string }> => {
  try {
    // Connecting to the DB
    await connectDB();

    // Finding the user with given UserName
    const user = await User.findOne({ userName: values.userName });
    if (!user) {
      return { error: "No user with this user name!!!" };
    }

    // Creating Session Rating
    const session = await Session.create({
      rating: values.rating,
      review: values.review,
      userId: user._id,
    });
    if (!session) {
      return { error: "Something went wrong!!!" };
    }

    console.log(values);
    console.log(session);

    // Converting the Mongoose doc into object
    const simpleSession = session.toObject({ getters: true, virtuals: false });
    delete simpleSession.__v;
    delete simpleSession._id;
    delete simpleSession.userId;
    return simpleSession;
  } catch (error) {
    console.log(error);
    return { error: "" };
  }
};

export const logoutAction = () => {
  deleteSession();
};

