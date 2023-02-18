import React from "react";

const TaskPriorityCard = ({ task }) => {
	return (
		<div className="card mb-3 bg-light-subtle">
			<div className="card-body">
				<div className="d-flex flex-column align-items-center text-center position-relative">
					<div className="mt-3">
						<h4>{task.priority}</h4>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TaskPriorityCard;
