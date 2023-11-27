import { Router } from "express";
import { addStudentInRoomController, addSubjectInRoomController, createRoomController, createStudentController, createSubjectController, createUserController, createVideoController, listRoomController, loginUserController, studentPresenceController } from "./controllers";
import { authMiddleware } from "./middlewares/auth-middleware";

const routes = Router();

routes.post('/subject', authMiddleware, (req, res ) => {
    return createSubjectController.handle(req,res);
});

routes.post('/room', authMiddleware, (req, res ) => {
    return createRoomController.handle(req,res);
});

routes.post('/video', authMiddleware, (req, res ) => {
    return createVideoController.handle(req,res);
});

routes.post('/addsubjectinroom', authMiddleware, (req, res ) => {
    return addSubjectInRoomController.handle(req,res);
});

routes.get('/rooms', authMiddleware, (req, res ) => {
    return listRoomController.handle(req,res);
});

routes.post('/student', authMiddleware, (req, res ) => {
    return createStudentController.handle(req,res);
});

routes.post('/addstudentinroom', authMiddleware, (req, res ) => {
    return addStudentInRoomController.handle(req,res);
});

routes.post('/addstudentpresence', authMiddleware, (req, res ) => {
    return studentPresenceController.handle(req,res);
});

routes.post('/createuser', (req, res) => {
    return createUserController.handle(req,res);
})

routes.post('/loginuser', (req, res) => {
    return loginUserController.handle(req,res);
})

export default routes;