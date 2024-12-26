import Image from "next/image";
import { Fragment, useState } from "react";
import CollectionDropdown from "../CollectionDropdown";

function AppHeader({ isCustomizing, onCollectionChange, onSave }) {
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	return (
		<Fragment>
			<CollectionDropdown
				onCollectionChange={onCollectionChange}
				currentCollection="appleWatchSeries10"
				onClose={() => setDropdownOpen(false)}
				isOpen={isDropdownOpen}
			/>
			<header className="app-header">
				{/* Logo */}
				<Image
					width={118}
					height={26}
					priority={true}
					className="logo"
					alt="Apple Logo"
					src="/jpeg/apple-watch-design-studio-logo.jpeg"
				/>

				{/* Dropdown */}
				<span
					className="dropdown"
					onClick={() => setDropdownOpen(true)}
					data-animation={isCustomizing ? "fade-in-500ms" : "hidden"}
				>
					<p>Collections</p>
					<Image
						width={8.54}
						height={4.87}
						loading="lazy"
						alt="arrow down icon"
						className="arrow-down"
						src="/svg/arrow-down.svg"
					/>
				</span>

				{/* Save Button */}
				<button
					onClick={onSave}
					className="save-btn"
					data-animation={isCustomizing ? "fade-in-500ms" : "hidden"}
				>
					Save
				</button>
			</header>
		</Fragment>
	);
}

export default AppHeader;
