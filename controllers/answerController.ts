import express, { Request, Response, NextFunction } from 'express';
import catchAsync from "../utils/catchAsync";
import Answer from '../models/answerSchema';


export const getAllAnswers = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  let answers = await Answer.find().limit(100);
    answers = answers.sort((a: any, b: any) => b.createdAt - a.createdAt);
  res.status(200).json({
    status: "success",
    length: answers.length,
    data: answers,
  });
});

