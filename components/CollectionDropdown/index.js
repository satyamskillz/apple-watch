import collectionData from "@/assets/collectionData.json";
import { useRef } from "react";

import "./style.scss";

function CollectionDropdown({ isOpen, onClose, currentCollection, onCollectionChange }) {
	if (!isOpen) return null;
	// const ctnRef = useRef(null);
	// const dropdownRef = useRef(null);

	// useEffect(() => {
	// 	return () => {};
	// }, []);

	const onItemClick = (e, id) => {
		e.stopPropagation();

		onCollectionChange(id);
		onClose();
	};

	return (
		<div className="collection-dropdown" onClick={onClose} data-animation="fade-in-150ms">
			<ul className="dropdown">
				{collectionData.map((c) => (
					<li
						key={c.id}
						className="item"
						onClick={(e) => onItemClick(e, c.id)}
						data-disabled={c.id === currentCollection}
					>
						<p>{c.name}</p>
					</li>
				))}
			</ul>
		</div>
	);
}

export default CollectionDropdown;
