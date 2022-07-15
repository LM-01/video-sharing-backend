import { createError } from "../error";
import User from "../models/User";
import Video from "../models/Video";

export const test = (req, res) => {
    res.json("Its Successful");
}

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({userId: req.user.id, ...req.body});
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (error) {
        next(error);
    }
}

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found"));
        if (req.user.id === video.userId){
            const updateVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{new: true});
        } else {
            return next(createError(403, "You can only update your own video"));
        }
        res.status(200).json(updateVideo);
    } catch (error) {
        next(error);
    }
}

export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found"));
        if (req.user.id === video.userId){
            await Video.findByIdAndDelete(
                req.params.id
            );
        } else {
            return next(createError(403, "You can only update your own video"));
        }
        res.status(200).json("Video has been deleted");
    } catch (error) {
        next(error);
    }
}

export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found"));
        res.status(200).json(video);
    } catch (error) {
        next(error);
    }
}

export const addView = async (req, res, next) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id,
            {$inc: {views: 1}},);
        if (!video) return next(createError(404, "Video not found"));
        res.status(200).json("View added");
    } catch (error) {
        next(error);
    }
}

export const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
}

export const trend = async (req, res, next) => {
    try {
        const videos = await Video.find({}).sort({views: -1}).limit(40);
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
}

export const sub = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;

        const list = Promise.all(
            subscribedChannels.map(channelId => {
                return Video.find({userId: channelId});
            })

    } catch (error) {
        next(error);
    }
}