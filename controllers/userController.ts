import { Request, Response } from "express";
import userData from "../data/users";
import pool from "../db/database";

let users = userData;

// GET /users
export const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const {rows} = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error("❌ Error fetching the users", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const getUserById = async (req: Request, res: Response): Promise<any> => {
  console.log(req.params);
  const {id} = req.params;
  try {
    const {rows} = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Failed to create the user" });
    }
    return res.status(200).json(rows);
  } catch (error) {
    console.error("❌ Error fetching the users", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
  
// POST /users
export const createUser = async (req: Request, res: Response): Promise<any> => {
  const {name, email} = req.body;
  try {
    const {rows} = await pool.query(`INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`, [name, email]);
    return res.status(201).json(rows[0]);
  } catch (error) {
    console.error("❌ Error creating the user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /users/:id
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, email } = req.body; 

  try {
    const {rows} = await pool.query(`UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *`, [name, email, id]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("❌ Error creating the user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /users/:id
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Error creating the user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
