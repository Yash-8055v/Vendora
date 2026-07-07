import {
  createHeroService,
  deleteHeroService,
  getAdminHeroSlidesService,
  getHeroByIdService,
  getHeroSlidesService,
  toggleHeroStatusService,
  updateHeroService,
} from "../services/hero.service.js";

export const createHeroController = async (req, res) => {
  try {
    const hero = await createHeroService(req.body, req.file);

    return res
      .status(201)
      .json({
        success: true,
        message: "Hero slide created successfully",
        data: hero,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getHeroSlidesController = async (req, res) => {
  try {
    const heroSlides = await getHeroSlidesService();
    return res
      .status(201)
      .json({
        success: true,
        message: "Hero slides fetched successfully",
        data: heroSlides,
      });
  } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
  }
  
};

export const getAdminHeroSlidesController = async (req, res) => {
  try {
    const {
      page = Math.max(1, Number(req.query.page) || 1),
      limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10)),
      search,
      status,
      sort,
    } = req.query;

    const data = await getAdminHeroSlidesService({
      page,
      limit,
      search,
      status,
      sort,
    });

    return res.status(200).json({
      success: true,
      ...data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getHeroByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const hero = await getHeroByIdService(id);

    return res.status(200).json({
      success: true,
      hero,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateHeroController = async (req, res) => {
  try {
    const { id } = req.params;

    const hero = await updateHeroService(id, req.body, req.file);

    return res.status(200).json({
      success: true,
      hero,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleHeroStatusController = async (req, res) => {
  try {
    const { id } = req.params;

    const hero = await toggleHeroStatusService(id);

    return res.status(200).json({
      success: true,
      hero,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteHeroController = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteHeroService(id);

    return res.status(200).json({
      success: true,
      message: "Hero deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
