import { Router } from "express";
import { questionCtr } from "../controllers/question";
import verifyAuth from "../middlewares/verifyAuth";

const questionRoute = Router();
questionRoute
  .route("/")
  .post(verifyAuth, questionCtr.insertQuestion)
  .get(verifyAuth, questionCtr.getAllQuestions);
questionRoute.get("/self", verifyAuth, questionCtr.getUserQuestions);
questionRoute
  .route("/quiz/:count")
  .get(verifyAuth, questionCtr.getRandomQuestions);
questionRoute
  .route("/:id")
  .put(verifyAuth, questionCtr.updateQuestion)
  .delete(verifyAuth, questionCtr.deleteQuestion)
  .get(verifyAuth, questionCtr.getQuestion)
  .patch(verifyAuth, questionCtr.approveQuestion);
export default questionRoute;
