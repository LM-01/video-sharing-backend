import User from '../models/User.js';

export const test = (req, res) => {
    res.json("Its Successful");
}

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    } else {
        next(createError(403, 'Unauthorized'));
    }
}

export const deleteUser = (req, res, next) => {
    res.json("Its Successful");
}

export const getUser = (req, res, next) => {
    res.json("Its Successful");
}

export const subscribe = (req, res, next) => {
    res.json("Its Successful");
}

export const unsubscribe = (req, res, next) => {
    res.json("Its Successful");
}
 
export const like = (req, res, next) => {
    res.json("Its Successful");
}

export const dislike = (req, res, next) => {
    res.json("Its Successful");
}