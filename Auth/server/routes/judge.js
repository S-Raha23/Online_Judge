const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

router.post("/run", async (req, res) => {
  const { language, code, input } = req.body;

  const folder = path.join(__dirname, "../temp");
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);

  const inputFilePath = path.join(folder, "input.txt");
  fs.writeFileSync(inputFilePath, input);

  let filename = "", runCmd = "";

  if (language === "cpp") {
    filename = "main.cpp";
    const filePath = path.join(folder, filename);
    fs.writeFileSync(filePath, code);

    const outputPath = path.join(folder, "main.exe"); // Use .exe on Windows
    runCmd = `g++ "${filePath}" -o "${outputPath}" && "${outputPath}" < "${inputFilePath}"`;
  } else if (language === "c") {
    filename = "main.c";
    const filePath = path.join(folder, filename);
    fs.writeFileSync(filePath, code);

    const outputPath = path.join(folder, "main.exe"); // Use .exe on Windows
    runCmd = `gcc "${filePath}" -o "${outputPath}" && "${outputPath}" < "${inputFilePath}"`;
  } else {
    return res.status(400).json({ error: "Only C and C++ supported" });
  }

  exec(runCmd, { timeout: 5000 }, (err, stdout, stderr) => {
    console.log("Running command:", runCmd);
    console.log("STDOUT:", stdout);
    console.log("STDERR:", stderr);

    if (err) {
      return res.status(200).json({
        output: stderr || err.message || "Error during execution",
      });
    }

    res.status(200).json({ output: stdout });
  });
});

module.exports = router;
