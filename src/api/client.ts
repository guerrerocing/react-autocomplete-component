import { User } from "../types/User";
import users from "./mock-data.json"

export const searchUsersByName = async (
    name: string
): Promise<User[]> => {
    return new Promise((resolve, _reject) => {
        try {
            const filtered = users.filter((user) =>
                user.name
                    .trim()
                    .toLocaleLowerCase()
                    .includes(name.trim().toLocaleLowerCase())
            );

            resolve(filtered);
        }
        catch (error) {
            _reject(error)
        }
    });
};