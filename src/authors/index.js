import express from "express";
import mongoose from 'mongoose'

const authorsRouter = express.Router ()

authorsRouter.post("/register", async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
})
authorsRouter.get("/", async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
})
authorsRouter.get("/:authorId", async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
})
authorsRouter.put("/:authorId", async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
})
authorsRouter.delete("/:authorId", async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
})

//*******************************************//
// get all authors
authorsRouter.get("/", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(authorsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSON = JSON.parse(fileAsString);
    res.send(fileAsJSON);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// create  author
authorsRouter.post("/register", async (req, res, next) => {
  try {
    const { name, surname, email, dateOfBirth } = req.body;

    const author = {
      id: uniqid(),
      name,
      surname,
      email,
      dateOfBirth,
      avatar: `https://ui-avatars.com/api/?name=${name}+${surname}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const fileAsBuffer = fs.readFileSync(authorsFilePath);

    const fileAsString = fileAsBuffer.toString();

    const fileAsJSONArray = JSON.parse(fileAsString);

    fileAsJSONArray.push(author);

    fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray));

    res.send(author);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// get single authors
authorsRouter.get("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(authorsFilePath);

    const fileAsString = fileAsBuffer.toString();

    const fileAsJSONArray = JSON.parse(fileAsString);

    const author = fileAsJSONArray.find(
      (author) => author.id === req.params.id
    );
    if (!author) {
      res
        .status(404)
        .send({ message: `Author with ${req.params.id} is not found!` });
    }
    res.send(author);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// delete  author
authorsRouter.delete("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(authorsFilePath);

    const fileAsString = fileAsBuffer.toString();

    let fileAsJSONArray = JSON.parse(fileAsString);

    const author = fileAsJSONArray.find(
      (author) => author.id === req.params.id
    );
    if (!author) {
      res
        .status(404)
        .send({ message: `Author with ${req.params.id} is not found!` });
    }
    fileAsJSONArray = fileAsJSONArray.filter(
      (author) => author.id !== req.params.id
    );
    fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray));
    res.status(204).send();
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

//  update author
authorsRouter.put("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(authorsFilePath);

    const fileAsString = fileAsBuffer.toString();

    let fileAsJSONArray = JSON.parse(fileAsString);

    const authorIndex = fileAsJSONArray.findIndex(
      (author) => author.id === req.params.id
    );
    if (!authorIndex == -1) {
      res
        .status(404)
        .send({ message: `Author with ${req.params.id} is not found!` });
    }
    const previousAuthorData = fileAsJSONArray[authorIndex];
    const changedAuthor = {
      ...previousAuthorData,
      ...req.body,
      updatedAt: new Date(),
      id: req.params.id,
    };
    fileAsJSONArray[authorIndex] = changedAuthor;

    fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray));
    res.send(changedAuthor);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

export default authorsRouter;
