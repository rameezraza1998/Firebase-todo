import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../config/firebase/configfirebase.js";
import {
  Button,
  Alert,
  TextField,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Todo() {
  const [todo, setTodo] = useState([]);
  const list = useRef();

  useEffect(() => {
    const getDatafromDB = async () => {
      const q = query(
        collection(db, "todo"),
        where("uid", "==", auth.currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const newTodo = querySnapshot.forEach((doc) => {
        

        console.log(doc.id, " => ", doc.data());
        todo.push({
          ...doc.data(),
          docid: doc.id,
        });
        setTodo([...todo]);
      });
    };
    getDatafromDB();
  }, []);

  const deleteTodo = async (item, index) => {
    console.log(item);
    await deleteDoc(doc(db, "todo", item.docid));
    todo.splice(index, 1);
    setTodo([...todo]);
    console.log("data deleted");
  };

  const editTodo = async (item , index) => {
    const updatedVal = prompt('enter updated val');
    const washingtonRef = doc(db, "todo", item.docid);

    await updateDoc(washingtonRef, {
      title: updatedVal
    });
    todo[index].title = updatedVal;
    setTodo([...todo]);
    console.log('todo updated')

  }


  const addtodo = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "todo"), {
        title: list.current.value,
        uid: auth.currentUser.uid,
      });
      console.log("Document written with ID: ", docRef.id);
      todo.push({
        title: list.current.value,
        uid: auth.currentUser.uid,
        docid: docRef.id,
      });
      setTodo([...todo]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    list.current.value = "";
    console.log(todo);
  };
  return (
    <>
      <Box
        sx={{
          maxWidth: 600,
          margin: "auto",
          padding: 3,
          backgroundColor: "bg-danger-subtle",
          borderRadius: "12px",
        }}
      >
        {/* Add Todo Form Card */}
        <Card sx={{ boxShadow: 8, borderRadius: "12px", mb: 4 }}>
          <CardContent>
            <Typography
              variant="h4"
              component="h2"
              sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
            >
              Add a New Todo
            </Typography>
            <form onSubmit={addtodo}>
              <TextField
                id="outlined-basic2"
                label="Enter Todo"
                variant="outlined"
                fullWidth
                inputRef={list}
                sx={{ mb: 3 }}
                placeholder="Type your todo here..."
                size="small"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  py: 1.5,
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: 3,
                  "&:hover": {
                    boxShadow: 6,
                    transform: "scale(1.05)",
                  },
                }}
              >
                Add Todo
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Todo List Section */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Todo List
          </Typography>

          {todo.length > 0 ? (
            <List>
              {todo.map((item, index) => (
                <ListItem key={index} sx={{ mb: 2 }}>
                  <Card
                    sx={{
                      width: "100%",
                      boxShadow: 3,
                      borderRadius: "8px",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: 8,
                      },
                    }}
                  >
                    <CardContent>
                      <ListItemText
                        primary={item.title}
                        sx={{ fontSize: "1rem", fontWeight: "bold" }}
                      />
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <IconButton
                        onClick={() => editTodo(item,index)}
                        color="primary"
                        size="small"
                        sx={{
                          "&:hover": {
                            color: "#1976d2",
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteTodo(item,index)}
                        color="secondary"
                        size="small"
                        sx={{
                          "&:hover": {
                            color: "#d32f2f",
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              No data found
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Todo;
