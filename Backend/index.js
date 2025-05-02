const express = require("express"); // This imports Express Framework.
const mongoose = require("mongoose");
const app = express(); // It creates an app object to build a web server, used to define routes, apply middleware, and handle HTTP requests.

const { initializeDatabase } = require("./db/db.connect");
initializeDatabase();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: "*",
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json()); // MIDDLEWARE - It automatically parses incoming request bodies with JSON data and makes them available under req.body for further processing in route handlers.

const SalesAgent = require("./models/salesAgent.model");
const Lead = require("./models/lead.model");
const Comment = require("./models/comment.model");
const { error } = require("console");

// ===============================
// ************ HOME ************
// ===============================

app.get("/", (req, res) => {
  res.send(` 
    <div style="font-family: Arial, sans-serif; background: #f0f4f8; padding: 50px; text-align: center;">
      <h1 style="color: #2c3e50; font-size: 3rem;">✨ Welcome to <span style="color: red;">ANVAYA</span> ✨</h1>
      <p style="font-size: 1.2rem; color: #555;">Your powerful CRM solution to manage leads, clients, and sales – all in one place.</p>
    </div>
    `);
});

// ===============================
// ************ LEADS ************
// ===============================

async function addNewLead(newLead) {
  try {
    const savedLead = new Lead(newLead);
    return await savedLead.save();
  } catch (error) {
    throw error;
  }
}

app.post("/leads", async (req, res) => {
  try {
    const { name, source, salesAgent, status, timeToClose, priority } =
      req.body;

    // name validation
    if (!name || typeof name !== "string") {
      return res.status(200).json({
        error: "Invalid input: 'name' is required and must be a string.",
      });
    }

    // source validation
    const allowedSources = [
      "Website",
      "Referral",
      "Cold Call",
      "Advertisement",
      "Email",
      "Other",
    ];
    if (!source || !allowedSources.includes(source)) {
      return res.status(400).json({
        error: `'source' is required and must be of: ${allowedSources.join(
          ", "
        )}`,
      });
    }

    // Sales Agent
    if (!salesAgent || !mongoose.Types.ObjectId.isValid(salesAgent)) {
      return res
        .status(400)
        .json({ error: `Sales Agent with ID ${salesAgent._id} not found.` });
    }

    // Status
    const allowedStatuses = [
      "New",
      "Contacted",
      "Qualified",
      "Proposal Sent",
      "Closed",
    ];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        error: `Status is required and must be of: ${allowedStatuses.join(
          ", "
        )}`,
      });
    }

    // timeToClose
    if (!timeToClose || timeToClose < 1) {
      return res.status(400).json({ error: "Time must be positive." });
    }

    // Priority {
    const allowedPriorities = ["High", "Medium", "Low"];
    if (!priority || !allowedPriorities.includes(priority)) {
      return res.status(400).json({
        error: `Priority is required and must be of: ${allowedPriorities.join(
          ", "
        )}`,
      });
    }

    // calling addLead function
    const savedLead = await addNewLead(req.body);
    const leadWithSalesAgent = await Lead.findById(savedLead._id).populate(
      "salesAgent"
    );
    res.status(201).json({
      success: true,
      message: "Lead added successfully.",
      lead: leadWithSalesAgent,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get all Leads
async function getAllLeads() {
  try {
    const leads = await Lead.find().populate("salesAgent");
    return leads;
  } catch (error) {
    throw error;
  }
}

app.get("/leads", async (req, res) => {
  try {
    const leads = await getAllLeads();
    if (leads.length != 0) {
      res.json(leads);
    } else {
      res.status(404).json({ error: "Leads not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leads." });
  }
});

// Update a Lead
async function updateLead(leadId, dataToUpdtaed) {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(leadId, dataToUpdtaed, {
      new: true,
    });
    return updatedLead;
  } catch (error) {
    throw error;
  }
}

app.put("/leads/:leadId", async (req, res) => {
  try {
    const updatedLead = await updateLead(req.params.leadId, req.body);
    if (updatedLead) {
      res
        .status(200)
        .json({ message: "Lead updated successfully.", updatedLead });
    } else {
      res
        .status(404)
        .json({ error: `Lead with ID ${req.params.leadId}  not found` });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to update lead." });
  }
});

// Delete a Lead
async function deleteLeadById(leadId) {
  try {
    const deletedLead = await Lead.findByIdAndDelete(leadId);
    return deletedLead;
  } catch (error) {
    console.log("Error in deleting lead: ", error);
  }
}

app.delete("/leads/:leadId", async (req, res) => {
  try {
    const deletedLead = await deleteLeadById(req.params.leadId);
    if (deletedLead) {
      res
        .status(200)
        .json({ message: "Lead deleted successfully.", deletedLead });
    } else {
      res
        .status(500)
        .json({ error: `Lead with ID ${req.params.leadId} not found.` });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Lead." });
  }
});

// ===============================
// ********* SALES AGENT *********
// ===============================

async function addSalesAgent(newSalesAgent) {
  try {
    const savedAgent = new SalesAgent(newSalesAgent);
    return await savedAgent.save();
  } catch (error) {
    throw error;
  }
}

app.post("/agents", async (req, res) => {
  try {
    const { name, email } = req.body;

    //    Name validation
    if (!name || typeof name !== "string") {
      return res.status(400).json({
        error: "Invalid input: 'name' is required and must be a string.",
      });
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'email' must be a valid address." });
    }

    // check for duplicate email
    const existingAgent = await SalesAgent.findOne({ email });
    if (existingAgent) {
      return res
        .status(409)
        .json({ error: `Sales agent with eamil '${email}' already exists.` });
    }

    // calling addSalesAgent function
    const savedAgent = await addSalesAgent(req.body);
    res.status(201).json({
      success: true,
      message: "Sales Agent added successfully.",
      "Sales Agent": savedAgent,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get All Sales Agents
async function getAllSalesAgent() {
  try {
    const agents = await SalesAgent.find();
    return agents;
  } catch (error) {
    throw error;
  }
}

app.get("/agents", async (req, res) => {
  try {
    const agents = await getAllSalesAgent();
    if (agents.length != 0) {
      res.json(agents);
    } else {
      res.status(404).json({ error: "Agents not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch agents." });
  }
});

// ===============================
// ********* COMMENTS *********
// ===============================

async function addNewComment(newComment) {
  try {
    const savedComment = new Comment(newComment);
    return savedComment;
  } catch (error) {
    throw error;
  }
}

app.post("/leads/:id/comments", async (req, res) => {
  try {
    const leadId = req.params.id;
    const { commentText, authorId } = req.body;

    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res
        .status(404)
        .json({ error: `Lead with ID '${leadId}' not found.` });
    }

    const author = await SalesAgent.findById(authorId);
    console.log(author);
    if (!author) {
      return res.status(404).json({ error: "Sales Agent not found." });
    }

    const newComment = new Comment({
      lead: leadId,
      author: authorId,
      commentText,
    });

    await newComment.save();
    res
      .status(201)
      .json({ message: "Comment added successfully.", Comment, newComment });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to add Comment." });
  }
});

// Get all comments
async function getAllComments(leadId) {
  try {
    const comments = await Comment.find({ lead: leadId }).populate(
      "author",
      "name"
    );
    return comments;
  } catch (error) {
    throw error;
  }
}

app.get("/leads/:id/comments", async (req, res) => {
  try {
    const comments = await getAllComments(req.params.id);
    if (comments.length !== 0) {
      res.json(comments);
    } else {
      res.status(404).json({ error: "Comments not found." });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to fetch comments." });
  }
});

// ===============================
// ********* REPORTING *********
// ===============================

app.get("/report/last-week", async (req, res) => {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    const closedLeads = await Lead.find({
      status: "Closed",
      closedAt: { $gte: sevenDaysAgo },
    });

    res.status(200).json(closedLeads);
  } catch (err) {
    console.error("Error fetching last-week closed leads:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/report/pipeline", async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments({ status: { $ne: "Closed" } });
    res.status(200).json({ pipelineCount: totalLeads });
  } catch (err) {
    console.error("Error fetching total leads in pipeline:", err);

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ===============================
// ************ SERVER ************
// ===============================
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});
