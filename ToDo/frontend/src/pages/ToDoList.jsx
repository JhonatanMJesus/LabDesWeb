import { use, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { getToDos, removeToDo } from "../api/ToDoApi";
import ToDoItem from "../components/ToDoItem";

export default function ToDoList(){
    const [toDos, setToDos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetch = async () => {
        try {
            
        } catch (error) {
            
        }
    }
}