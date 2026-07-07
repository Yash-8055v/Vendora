import { getHomeService } from "../services/home.service.js";




export const getHomeController = async (req, res) => {
    try {
      const homeData = await getHomeService();
      return res.status(200).json({
        success: true,
        message: "Home data fetched successfully",
        data: homeData
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        
      });
    }

    
};