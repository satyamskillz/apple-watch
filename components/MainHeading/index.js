import "./style.scss";

function MainHeading({ isCustomizing, setCustomizing }) {
	return (
		<h1 className="main-heading">
			<div
				className="layer"
				data-animation={isCustomizing ? "fade-out-500ms" : "fade-in-500ms"}
			>
				<p>Apple Watch Studio</p>
				<h1>
					<span>Choose a case.</span>
					<span>Pick a band.</span>
					<span>Create your own style.</span>
				</h1>
				<button
					type="button"
					className="start-btn"
					onClick={() => setCustomizing((prev) => !prev)}
				>
					Get started
				</button>
			</div>
		</h1>
	);
}

export default MainHeading;
