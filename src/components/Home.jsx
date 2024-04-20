import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTodos } from "../features/todoSlice";

const Home = () => {

    const disPatch = useDispatch();

    const todos = useSelector(store => store.todos)

    useEffect(() => {
        disPatch(getTodos());


    }, [disPatch])


    if (todos.isLoading && !todos.data) {
        return <div>Loading..</div>
    }

    if (todos.error) {
        return <div>Error.. {todos.error.message}</div>
    }



    return (
        <>

            <h1 className="my-2 text-center">API calling in RTK</h1>
        

            <ul>
                {
                    todos.data && todos.data.map((ele, i) => (
                        <li key={i}>{ele.title}</li>
                    ))
                }
            </ul>

        </>
    )
}

export default Home