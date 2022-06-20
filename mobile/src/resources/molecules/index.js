// Little boxes at the top of the OnboardingScreenTemplate to show what stage of onboarding the user is at
export { default as AuthScreenIndicator } from "./AuthScreenIndicator";

// Logo image on OnboardingLanding. Could possibly be moved into the /auth folder for greater clarity.
export { default as OnboardingLandingImage } from "./OnboardingLandingImage";

// Modal that pops up for dialogue with the user (ex. Onboarding user isn't old enough)
export { default as SystemmessageModal } from "./SystemmessageModal";

// Modal that pops up for error dialogue
export { default as ErrormessageModal } from "./ErrormessageModal";

// Vestigial component. Currently used only with Vault. Should be removed when Vault is renovated. Take On and OffCubeSizeButtons with it
export { default as PageHeaderWithOptions } from "./PageHeaderWithOptions";

// Could possibly be brought into the Vault screen (only place it's currently used). TouchableOpacity styled like a text box
export { default as SearchbarTouchable } from "./SearchbarTouchable";

// Displays percentage completion of content upload
export { default as LoadProgressModal } from "./LoadProgressModal";

// SystemmessageModal with customizable buttons
export { default as ButtonMessageModal } from "./ButtonMessageModal";
