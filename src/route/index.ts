import { Router } from "express";
const router = Router();

import { readCustomersData } from "../controller/customers.controller";

router.get('/customers', readCustomersData);

export default router;