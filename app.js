// const express = require("express");
// const { db } = require("./fakeDb");

import express from "express";
import * as db from "./mysqlDatabase.js";

const app = express();

// deploymnet

// EJS + Body parser
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Access to the folders like styles
app.use(express.static("public"));

// Note array
const note = [];

// Create a note
app.get("/", async (req, res) => {
  const notes = await db.getNotes();
  res.render("index.ejs", { note: notes });
});

app.post("/createNote", async (req, res) => {
  const data = req.body;
  await db.addNote(data.title, data.content);
  res.redirect("/");
});

app.post("/deleteNote", async (req, res) => {
  const id = req.body.id;
  await db.deleteNote(id);
  res.redirect("/");
});

// app.get("/notes", (req, res) => {
//   const notes = database.getNotes();
//   res.render("notes.ejs", {
//     notes,
//   });
// });

// app.get("/notes/:id", (req, res) => {
//   const id = +req.params.id;
//   const note = database.getNote(id);
//   if (!note) {
//     res.status(404).render("note404.ejs");
//     return;
//   }

//   res.render("singleNote.ejs", {
//     note,
//   });
// });

// app.get("/createNote", (req, res) => {
//   res.render("createNote.ejs");
// });

// app.post("/notes", (req, res) => {
//   const data = req.body;
//   database.addNote(data);

//   res.redirect("/notes");
// });

// app.post("/notes/:id/delete", (req, res) => {
//   const id = +req.params.id;
//   database.deleteNote(id);
//   res.redirect("/notes");
// });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
