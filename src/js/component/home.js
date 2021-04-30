import React, { useState, useEffect } from "react";

export function Home() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [error, setError] = useState(false);

	const URI = "https://assets.breatheco.de/apis/fake/todos";

	const getTask = async () => {
		try {
			let response = await fetch(URI + "/user/barbierincones");
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setTasks(data);
			} else {
				console.log("unsuccessful request");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const addTask = async event => {
		try {
			if (event.key === "Enter") {
				if (event.target.value.trim() != "") {
					let response = await fetch(URI + "/user/barbierincones", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify([
							...tasks,
							{ label: newTask, done: false }
						])
					});
					if (response.ok) {
						await getTask();
						setNewTask("");
					} else {
						console.log(response.statusText);
						console.log(
							"Task could not be added, please try again"
						);
					}
				} else {
					setError(true);
					return;
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTask = async id => {
		try {
			let filterTasks = tasks.filter((newTask, index) => {
				return id != index;
			});
			let response = await fetch(URI + "/user/barbierincones", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([...filterTasks])
			});
			if (response.ok) {
				await getTask();
			} else {
				console.log(response.statusText);
				console.log("The task could not be deleted, please try again");
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTask();
	}, []);

	return (
		<div className="text-center mt-5 d-flex flex-column justify-content-center align-items-center">
			<h1>Todos</h1>
			<div className="main shadow p-3 mb-5">
				<input
					className="color-change"
					placeholder="Add your tasks here:"
					value={newTask}
					onChange={e => {
						setNewTask(e.target.value);
						setError(false);
					}}
					onKeyPress={addTask}
				/>
				<ul>
					{tasks.map((newTask, index) => {
						return (
							<li key={index} className="hidden-icon">
								{newTask.label}
								<span onClick={() => deleteTask(index)}>✖</span>
							</li>
						);
					})}
				</ul>
				<div>
					<span className="footer-text">
						{tasks.length == 1
							? `${tasks.length} tarea restante.`
							: tasks.length == 0
							? "¡No hay tareas por hacer!"
							: `${tasks.length} tareas restantes.`}
					</span>
				</div>
			</div>
		</div>
	);
}
