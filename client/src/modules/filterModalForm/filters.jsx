import { useMod } from "hooks/useMod";
import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getSizes } from "store/slices/categorySize";
import { getSpheres } from "store/slices/categorySphere";
import { getPriorities } from "store/slices/priority";
import { getTaskList } from "store/slices/tasks";
const Filters = ({ onSelect }) => {
	const priorities = useSelector(getPriorities());
	const spheres = useSelector(getSpheres());
	const sizes = useSelector(getSizes());
	const tasks = useSelector(getTaskList());
	const [filterModal, setFilterModal] = useMod(false);
	const handleClick = ({ target }) => {
		setFilterModal();
		if (!target.value) {
			onSelect({});
		}
		onSelect({ [target.name]: target.value });
	};

	if (tasks.length === 0) return null;
	return (
		<Container>
			<div className="d-flex flex-column align-items-end mt-5">
				<Button
					className=" d-flex align-items-center bg-info"
					onClick={setFilterModal}
					variant="dark"
				>
					<span className="mx-3">Фильтры</span>
					<i className="fs-4 bi bi-filter"></i>
				</Button>
			</div>
			<Modal
				contentClassName="bg-dark"
				show={filterModal}
				onHide={setFilterModal}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton closeVariant="white">
					<h3 className=" text-lg text-center text-light">Фильтр</h3>
				</Modal.Header>

				<Container>
					<Row>
						<Col md={10} className="offset-md-1 ">
							<div className="mb-4 mt-4">
								<h5>Сфера</h5>
								<hr />
								<ul>
									{spheres.map((sphere) => (
										<li
											key={sphere._id}
											style={{ listStyle: "none" }}
										>
											<button
												className="text-light"
												value={sphere._id}
												onClick={(e) => handleClick(e)}
												name="sphere"
											>
												{sphere.name}
											</button>
										</li>
									))}
								</ul>
							</div>
							<div className="mb-4">
								<h5>Размер</h5>
								<hr />
								<ul>
									{sizes.map((size) => (
										<li
											key={size._id}
											style={{ listStyle: "none" }}
										>
											<button
												className="text-light"
												value={size._id}
												onClick={(e) => handleClick(e)}
												name="size"
											>
												{size.name}
											</button>
										</li>
									))}
								</ul>
							</div>

							<div className="mb-4">
								<h5>Приоритет</h5>
								<hr />
								<ul>
									{priorities.map((priority) => (
										<li
											key={priority._id}
											style={{ listStyle: "none" }}
										>
											<button
												className="text-light"
												value={priority._id}
												onClick={(e) => handleClick(e)}
												name="priority"
											>
												{priority.name}
											</button>
										</li>
									))}
								</ul>
							</div>
							<Button
								className="w-100 mb-4"
								onClick={(e) => handleClick(e)}
							>
								Сбросить фильтр
							</Button>
						</Col>
					</Row>
				</Container>
			</Modal>
		</Container>
	);
};

export default Filters;
