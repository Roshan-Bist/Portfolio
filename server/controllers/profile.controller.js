const Profile = require("../Models/profileModel");
const fs = require("fs");
const path = require("path");
const {
    DEFAULT_PROFILE_IMAGE,
    withDefaultImage,
    isDefaultProfileImage,
} = require("../constants");

exports.createProfile = async (req, res) => {
    try {
        const profile = new Profile({
            ...req.body,
            image: req.body.image || DEFAULT_PROFILE_IMAGE,
        });
        await profile.save();
        res.status(201).json({ message: "Profile created successfully", profile: withDefaultImage(profile) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Profile updated successfully", profile: withDefaultImage(profile) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if (profile && profile.image) {
            // Check if it's a local file and not an external URL (like placeholder.com)
            if (profile.image.startsWith("/uploads/") && !isDefaultProfileImage(profile.image)) {
                const imagePath = path.join(__dirname, "..", profile.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
        }
        res.status(200).json({ message: "Profile deleted successfully", profile });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Please upload a file" });
        }

        const profileId = req.params.id;
        const profile = await Profile.findById(profileId);

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        // Delete old image if it exists, is local, and is not the shared default
        if (
            profile.image &&
            profile.image.startsWith("/uploads/") &&
            !isDefaultProfileImage(profile.image)
        ) {
            const oldImagePath = path.join(__dirname, "..", profile.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        // Update profile with new image path
        const newImagePath = `/uploads/${req.file.filename}`;
        profile.image = newImagePath;
        await profile.save();

        res.status(200).json({
            message: "Profile image uploaded successfully",
            profile: withDefaultImage(profile),
            imageUrl: newImagePath,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        res.status(200).json({
            message: "Profile fetched successfully",
            profile: withDefaultImage(profile),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json(profiles.map(withDefaultImage));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
