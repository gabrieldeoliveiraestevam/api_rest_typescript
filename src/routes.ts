import { Router } from "express";
import { addStudentInRoomController, addSubjectInRoomController, createRoomController, createStudentController, createSubjectController, createUserController, createVideoController, listRoomController, studentPresenceController } from "./controllers";

const routes = Router();

routes.post('/subject', (req, res ) => {
    return createSubjectController.handle(req,res);
});

routes.post('/room', (req, res ) => {
    return createRoomController.handle(req,res);
});

routes.post('/video', (req, res ) => {
    return createVideoController.handle(req,res);
});

routes.post('/addsubjectinroom', (req, res ) => {
    return addSubjectInRoomController.handle(req,res);
});

routes.get('/rooms', (req, res ) => {
    return listRoomController.handle(req,res);
});

routes.post('/student', (req, res ) => {
    return createStudentController.handle(req,res);
});

routes.post('/addstudentinroom', (req, res ) => {
    return addStudentInRoomController.handle(req,res);
});

routes.post('/addstudentpresence', (req, res ) => {
    return studentPresenceController.handle(req,res);
});

routes.post('/createuser', (req, res) => {
    return createUserController.handle(req,res);
})

export default routes;