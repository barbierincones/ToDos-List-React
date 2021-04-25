import React, { useState } from "react";

export function Home() {
	//1) Crear un componente de estado (useState) para guardar el estado inicial de las tareas.
	//2) Designar el valor del componente de estado en el input.
	//3) Crear un evento (onChange) para almacenar el nuevo estado de las tareas.
	//4) Crear un segundo componente de estado (useState) para poder manipular el nuevo estado de las tareas que se generan.
	//5) Crear un segundo evento (onKeyPress) para guardar las propiedades (id, label) del objeto que representa ese nuevo estado de las tareas.
	//6) Crear una función (.map) para recorrer el arreglo y devolverlo dentro de la lista requerida.
	//7) Crear un tercer evento (onClick) para eliminar una tarea.
	//8) Crear una función (.filter) para comparar el id seleccionado con todos los demás Id's de las tareas y así poder excluir la tarea que se quiere eliminar.

	const [newTask, setNewTask] = useState("");
	const [tasks, setTasks] = useState([]);

	return (
		<div className="text-center mt-5 todos-list">
			<h1>Todos</h1>
			<div className="main shadow p-3 mb-5">
				<input
					className="color-change"
					placeholder="Add your tasks here:"
					value={newTask}
					onChange={e => setNewTask(e.target.value)}
					onKeyPress={e => {
						if (e.key == "Enter") {
							setTasks([
								...tasks,
								{
									id: Math.random()
										.toString(16)
										.substring(2),
									label: newTask
								}
							]);
							setNewTask("");
						}
					}}></input>
				<ul>
					{tasks.map(task => (
						<li key={task.id} className="hidden-icon">
							{task.label}
							<span
								onClick={e => {
									let filterTasks = tasks.filter(
										t => t.id != task.id
									);
									setTasks(filterTasks);
								}}>
								✖
							</span>
						</li>
					))}
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
