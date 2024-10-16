const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

const filePath = "./todos.json";

program
  .command("add-todo")
  .description("Adds a todo in the JSON file")
  .argument("<task-name>", "task to be added")
  .action((taskname) => {
    const newData = { id: 1, index: 1, taskname: taskname };
    fs.readFile(filePath, "utf8", (err, fileData) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      let jsonObject;
      try {
        jsonObject = JSON.parse(fileData);
      } catch (parseErr) {
        console.error("Error parsing JSON:", parseErr);
        return;
      }

      const lastItem = jsonObject.data[jsonObject.data.length - 1];
      const newId = lastItem ? lastItem.id + 1 : 1;
      const newIndex = lastItem ? lastItem.index + 1 : 1;

      const newObjectWithId = { ...newData, id: newId, index: newIndex };

      jsonObject.data.push(newObjectWithId);

      fs.writeFile(
        filePath,
        JSON.stringify(jsonObject, null, 2),
        "utf8",
        (writeErr) => {
          if (writeErr) {
            console.error("Error writing file:", writeErr);
          } else {
            console.log("New Todo Added Successfully.");
          }
        }
      );
    });
  });

program.parse();
