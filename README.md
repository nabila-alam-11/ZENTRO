# ZENTRO - A CRM Application

A full-stack CRM platform to manage sales leads and agents efficiently. Core functionalities include lead and agent creation/editing, lead search by name or agent, status and priority filters, and sorting by estimated closure time. Integrated data visualization with Chart.js for comprehensive performance reporting.<br>
Built with React frontend, Express/Node.js backend, MongoDB database, Pure CSS for styling.

---

## Demo Link

[Live Demo](https://zentro-tan.vercel.app/)

---

## Quick Start

```
git clone https://github.com/nabila-alam-11/ZENTRO.git
cd <Frontend>
npm install
npm run dev
```

---

## Technologies

- React JS
- Express
- Node JS
- MongoDB
- React Router
- Chart.js
- Context API

---

## Demo Video

Watch a walkthrough (7 minutes) of all major features of this app:
[Video](https://drive.google.com/file/d/1xJFDghZvoLRtB8-uu5v8fEx1HmAAipZx/view?usp=sharing)

---

## Features

### Dashboard

- Displays the distribution of leads by status.
- Quick actions
  - **Add Lead** - Add a new prospect
  - **View Reports** - Access and analyze sales performance and agent activity
  - **View Deals** - Browse and manage ongoing deals in the pipeline
- Quick Filters: Filter leads based on priority
  - 🔴 High
  - 🟡 Medium
  - 🔵 Low

### Leads

- Displays all leads with status, priority,closing time, sales agent
- Includes a **Details** button to view single lead details
- Search leads by name
- Filter leads by current status
- Sort leads by priority
- **+ Add Lead** button to add a new prospect

### Sales

- Overview of all sales deals
- Includes client name, budget, sales agent, closing time
- Search leads by name

### Agents

- Displays all agents with name, email
- Includes a **Details** button to view single agent details
- **+Add Sales Agent** button to add a new agent

### Reports

- Visualize closed vs. pipeline leads with a pie chart
- Bar graph illustrates leads closed by each agent
- Pie chart shows lead distribution by status

### Lead List by Status

- Shows all leads with the selected status, along with assigned agents
- Filter leads by agent and priority
- Sort leads by closing time

### Lead List by Agent

- Shows all leads with the selected agent, along with current status
- Filter leads by status and priority
- Sort by Time to Close

### Lead Management - Single Lead Details

- Displays complete lead information: name, agent, source, status, priority, time to close, and tags
- **Edit Lead Details** button to update the saved lead details

### Add New Lead

- Input form to create a new lead
- Fields include name, source, tags, sales agent, status, closing time and priority

### Edit Lead

- Input form to update the existing leads
- Fields include name, source, agent, status, closing time and priority

---

## API Reference

### **GET /leads**<br>

List all leads<br>
Sample Response<br>

```
[{_id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt},.....]
```

### **GET /agents**<br>

List all agents<br>
Sample Response<br>

```
[{_id, name, email, createdAt},....]
```

### **GET /leads/:id/comments**<br>

Displays all comments by lead id<br>
Sample Response<br>

```
[{_id, lead, author, commentText, createdAt}, ....]
```

### **GET /report/last-week**<br>

Returns report of leads closed by each agent in the last 7 days<br>
Sample Response<br>

```
[{_id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt},....]
```

### **GET /report/pipeline**<br>

Returns total leads in the pipeline<br>
Sample Response<br>

```
{pipelineCount}
```

### **POST /leads**<br>

Creates a new lead<br>
Sample Response<br>

```
{name, source, salesAgent, status, tags, timeToClose, priority}
```

### **POST /agents**<br>

Creates a new agent<br>
Sample Response<br>

```
{name, email}
```

### **POST /leads/:id/comments**<br>

Creates a new comment<br>
Sample Request<br>

```
{lead, author, commentText}
```

### **POST /leads/:leadId**<br>

Updates an existing lead by the specified lead ID<br>
Sample Request<br>

```
{name, source, salesAgent, status, tags, timeToClose, priority}
```

### **DELETE /leads/:leadId**<br>

Deletes an existing lead by the specified lead ID<br>
No request body required

---

## Contact

For bugs or feature request, please reach out to nabilazaheer1198@gmail.com
