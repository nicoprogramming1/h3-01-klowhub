import { Request, Response } from 'express';
import UserModel from '../models/UserModel';

//Actualizar un usuario
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { password, role, ...updateData } = req.body;

        const user = await UserModel.findByPk(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        await user.update(updateData);
        const updatedUser = user.toJSON();

        res.json({ user: updatedUser, message: "User updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating user" });
    }
};

//Llamar a un usuario por id
export const getOneUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findByPk(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const { password, ...userWithoutPassword } = user.toJSON();

        res.json({ user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user" });
    }
};

//Desactivar la cuanta del usuario
export const deactivateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findByPk(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        await user.update({ isValid: false });

        res.json({ message: "User has been deactivated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deactivating user" });
    }
};