import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// Prompt the user for a URL
inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;

    // Generate QR code from the URL
    const code = qr.image(url, { type: 'png' });

    // Save the QR code image
    code.pipe(fs.createWriteStream("qrcode.png"));

    // Save the user input in a text file
    fs.writeFile("user_url.txt", url, (err) => {
      if (err) {
        console.error("Error saving the URL to a text file:", err);
      } else {
        console.log("URL saved to user_url.txt and QR code generated as qrcode.png");
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something else went wrong:", error);
    }
  });
