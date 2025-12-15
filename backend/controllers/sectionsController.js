import {
  fetchSectionsModel,
  fetchSectionByIdModel,
  createSectionModel,
  updateSectionModel,
  deleteSectionModel,
} from "../models/sectionsModel.js";

// Get all sections
export const getSections = async (req, res) => {
  try {
    const sections = await fetchSectionsModel();
    res.status(200).json(sections);
  } catch (err) {
    console.error("Error fetching sections:", err);
    res.status(500).json({ error: "Failed to fetch sections" });
  }
};

// Get one section by ID
export const getSection = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await fetchSectionByIdModel(id);
    if (!section) return res.status(404).json({ error: "Section not found" });
    res.status(200).json(section);
  } catch (err) {
    console.error("Error fetching section:", err);
    res.status(500).json({ error: "Failed to fetch section" });
  }
};

// Create a section
export const createSection = async (req, res) => {
  try {
    const newSection = await createSectionModel(req.body);
    res.status(201).json(newSection);
  } catch (err) {
    console.error("Error creating section:", err);
    res.status(500).json({ error: "Failed to create section" });
  }
};

// Update a section
export const updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSection = await updateSectionModel(req.body);
    if (!updatedSection) return res.status(404).json({ error: "Section not found" });
    res.status(200).json(updatedSection);
  } catch (err) {
    console.error("Error updating section:", err);
    res.status(500).json({ error: "Failed to update section" });
  }
};

// Delete a section
export const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteSectionModel(id);
    if (!deleted) return res.status(404).json({ error: "Section not found" });
    res.status(200).json({ message: "Section deleted successfully" });
  } catch (err) {
    console.error("Error deleting section:", err);
    res.status(500).json({ error: "Failed to delete section" });
  }
};
