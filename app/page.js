"use client";

import { useState } from "react";

import "./page.scss";
import MainHeading from "@/components/MainHeading";
import DefaultWatch from "@/components/DefaultWatch";
import CustomizationOptions from "@/components/CustomizationOptions";

import collections from "@/assets/collectionData.json";
import CustomWatch from "@/components/CustomWatch";
import AppHeader from "@/components/AppHeader";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const [isCustomizing, setCustomizing] = useState(false);
	const [isSideViewActive, setSideViewActive] = useState(false);
	const [activeOptionTab, setActiveOptionTab] = useState(null);
	const [selectedOption, setSelectedOption] = useState(null);

	const [newOptionId, setNewOptionId] = useState(null);

	const [currentCollection, setCurrentCollection] = useState(collections[0]);
	const [currentWatch, setCurrentWatch] = useState(collections[0].defaultOption);

	const onCollectionChange = (id) => {
		const collection = collections.find((c) => c.id === id);
		setCurrentCollection(collection);
		setCurrentWatch(collection.defaultOption);
		setSideViewActive(false);
		setActiveOptionTab(null);
		setSelectedOption();
		setNewOptionId(null);
	};

	const onOptionTabClick = (option) => {
		console.log(option);

		setActiveOptionTab(option.id);
		setSelectedOption(option);
		setSideViewActive(false);
	};

	const onVariantTabClick = (variant) => {
		setNewOptionId(variant.id);
	};

	const onSave = () => {
		router.push(
			`/buy?collection=${currentCollection.id}&size=${currentWatch.size}&case=${currentWatch.case}&caseVariant=${currentWatch.caseVariant}&band=${currentWatch.band}&bandVariant=${currentWatch.bandVariant}`
		);
	};

	return (
		<div className="container">
			{/* Header */}
			<AppHeader
				onSave={onSave}
				isCustomizing={isCustomizing}
				onCollectionChange={onCollectionChange}
			/>

			<main className="app-main">
				{/* Page Heading */}
				<MainHeading isCustomizing={isCustomizing} setCustomizing={setCustomizing} />

				{/* Default Watch: belt > screen + details  */}
				<DefaultWatch
					currentWatch={currentWatch}
					isCustomizing={isCustomizing}
					activeOptionTab={activeOptionTab}
					isSideViewActive={isSideViewActive}
					setSideViewActive={setSideViewActive}
					currentCollection={currentCollection}
				/>
				{!!activeOptionTab && (
					<CustomWatch
						setSideViewActive={setSideViewActive}
						isSideViewActive={isSideViewActive}
						setCurrentWatch={setCurrentWatch}
						activeOptionTab={activeOptionTab}
						selectedOption={selectedOption}
						currentWatch={currentWatch}
						newOptionId={newOptionId}
					/>
				)}
			</main>

			{/* Watch customization tabs  */}
			<CustomizationOptions
				currentWatch={currentWatch}
				isCustomizing={isCustomizing}
				activeOptionTab={activeOptionTab}
				onOptionTabClick={onOptionTabClick}
				onVariantTabClick={onVariantTabClick}
				options={currentCollection.options}
			/>
		</div>
	);
}
