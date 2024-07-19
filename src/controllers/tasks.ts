import express from "express";
import { v4 as uuidv4 } from "uuid";

// export const createTask = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { title, description, due_date } = req.body;

//     if (!title || !description || !due_date) {
//       return res.sendStatus(400);
//     }
//     const userData = (req as any).user;

//     if (!userData) {
//       return res.sendStatus(403);
//     }

//     const existingTitle = await getTaskByTitle(title);

//     if (existingTitle.length !== 0) {
//       return res.sendStatus(400);
//     }

//     const [day, month, year] = due_date.split("/").map(Number);

//     const dateObject = new Date(year, month - 1, day);

//     const currentDate = new Date();

//     if (dateObject <= currentDate) {
//       return res
//         .status(400)
//         .json({ error: "Entered date must be after the current date." });
//     }
//     const data = await createTaskData({
//       id: uuidv4(),
//       title,
//       description,
//       due_date,
//       author_id: userData.id,
//     });

//     return res.sendStatus(200);
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(500);
//   }
// };

// export const getTasks = async (req: express.Request, res: express.Response) => {
//   try {
//     const userData = (req as any).user;

//     if (!userData) {
//       return res.sendStatus(403);
//     }

//     const tasks = await getTaskByAuthorId(userData.id);
//     if (tasks?.length === 0) {
//       return res.sendStatus(404);
//     }
//     const reversTask =  tasks !== undefined ? tasks.reverse() : []

//     return res.status(200).json(reversTask);
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(400);
//   }
// };
