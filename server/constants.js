/** Fallback profile photo until admin uploads a new file or pastes a URL. */
const DEFAULT_PROFILE_IMAGE = "/uploads/image-1771971173338-501230229.jpg";

function withDefaultImage(profile) {
    if (!profile) return profile;
    const obj = typeof profile.toObject === "function" ? profile.toObject() : { ...profile };
    if (!obj.image) {
        obj.image = DEFAULT_PROFILE_IMAGE;
    }
    return obj;
}

function isDefaultProfileImage(imagePath) {
    return imagePath === DEFAULT_PROFILE_IMAGE;
}

module.exports = {
    DEFAULT_PROFILE_IMAGE,
    withDefaultImage,
    isDefaultProfileImage,
};
