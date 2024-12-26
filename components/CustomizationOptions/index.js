import Image from "next/image";
import "./style.scss";

function CustomizationOptions({
	options,
	currentWatch,
	isCustomizing,
	activeOptionTab,
	onVariantTabClick,
	onOptionTabClick,
}) {
	return (
		<div className="customization-options" data-active={isCustomizing}>
			<div className="options-wrapper">
				{options?.map((option) => (
					<div
						key={option.id}
						className="option-tab"
						onClick={() => onOptionTabClick(option)}
					>
						<Image
							width={25}
							height={25}
							loading="lazy"
							alt={option.name}
							src={option.imageUrl}
							className="option-icon"
						/>
						<div className="option-variants">
							{activeOptionTab === option.id ? (
								<ul className="variants-list">
									{option.variants.map((variant) => (
										<li
											onClick={() => onVariantTabClick(variant)}
											className="varient-tab"
											key={variant.id}
											data-selected={
												currentWatch.size === variant.id ||
												currentWatch.case === variant.id ||
												currentWatch.band === variant.id
											}
										>
											{variant.name}
										</li>
									))}
								</ul>
							) : (
								<span className="option-name">{option?.name}</span>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default CustomizationOptions;
