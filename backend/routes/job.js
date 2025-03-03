import express from "express";
import { errorLogger } from "../middleware/log.js";
import { authMiddleware } from "../middleware/auth.js";
import job from "../models/job.js";
const router = express.Router();
//list all jobs
router.get("/", async (req, res) => {
    const jobs = await job.find();
    res.status(200).json(jobs);
});


//create a job
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, description, location, salary, company, skills, remote, type } = req.body;
        const jobSkills = skills.split(",").map(skill => skill.trim());
        const newJob = new job({
            title,
            description,
            location,
            salary,
            company,
            skills: jobSkills,
            remote,
            type,
            createdBy: req.user._id
        });
        await newJob.save();
        res.status(200).json(newJob);
    }
    catch (err) {
        errorLogger(err, req, res);
    }
});

//get a job by id
router.get("/:id", async (req, res) => {
    try {
        const job = await job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({
                error: {
                    message: "Job not found",
                    status: 404
                }
            });
        }
        res.status(200).json(job);
    }
    catch (err) {
        errorLogger(err, req, res);
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const job = await job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({
                error: {
                    message: "Job not found",
                    status: 404
                }
            });
        }
        if (job.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                error: {
                    message: "You are not authorized to delete this job",
                    status: 401
                }
            });
        }
        await job.remove();
        res.status(200).json({ message: "Job deleted successfully" });
    }
    catch (err) {
        errorLogger(err, req, res);
    }
})


export default router;