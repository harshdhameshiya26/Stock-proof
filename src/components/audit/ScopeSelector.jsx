import { FormLayout, Select, TextField } from "@shopify/polaris";

export default function ScopeSelector({ scope, onChange, locations = [], collections = [] }) {
	const update = (key) => (value) => onChange({ ...scope, [key]: value });
	const locationOptions = [{ label: "Select a location", value: "" }, ...locations.map((location) => ({ label: location.name || location.title, value: location.id || location._id }))];
	const collectionOptions = [{ label: "All collections", value: "" }, ...collections.map((collection) => ({ label: collection.title || collection.name, value: collection.id || collection._id }))];

	return (
		<FormLayout>
			<Select label="Audit scope" options={[{ label: "Location", value: "location" }, { label: "Collection", value: "collection" }, { label: "Vendor", value: "vendor" }]} value={scope.scopeType || "location"} onChange={update("scopeType")} />
			{scope.scopeType === "location" && <Select label="Location" options={locationOptions} value={scope.locationId || ""} onChange={update("locationId")} />}
			{scope.scopeType === "collection" && <Select label="Collection" options={collectionOptions} value={scope.collectionId || ""} onChange={update("collectionId")} />}
			{scope.scopeType === "vendor" && <TextField label="Vendor" value={scope.vendor || ""} onChange={update("vendor")} autoComplete="off" />}
		</FormLayout>
	);
}