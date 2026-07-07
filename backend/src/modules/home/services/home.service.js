import Hero from "../../hero/models/hero.model.js";
import Category from "../../category/category.model.js";
import Product from "../../product/product.model.js";
import Store from "../../store/store.model.js";

export const getHomeService = async () => {
  const currentDate = new Date();

  const [
    heroSlides,

    featuredCategories,
    totalCategories,

    featuredStores,
    totalStores,

    trendingProducts,
    totalTrendingProducts,

    newArrivals,
    totalProducts,
  ] = await Promise.all([
    Hero.find({
      status: "active",
      $or: [
        {
          startDate: null,
          endDate: null,
        },
        {
          startDate: { $lte: currentDate },
          endDate: { $gte: currentDate },
        },
      ],
    })
      .sort({ order: 1 })
      .lean(),

    Category.find({
      status: { $ne: "deleted" },
      isFeatured: true,
    })
      .limit(6)
      .lean(),

    Category.countDocuments({
      status: { $ne: "deleted" },
    }),

    Store.find({
      status: "active",
      isFeatured: true,
    })
      .limit(3)
      .lean(),

    Store.countDocuments({
      status: "active",
    }),

    Product.find({
      status: "active",
    })
      .populate("storeId", "storeName slug logo")
      .sort({ createdAt:-1})
      .limit(8)
      .lean(),

    Product.countDocuments({
      status: "active",
    }),

    Product.find({
      status: "active",
    })
      .populate("storeId", "storeName slug logo")
      .sort({ createdAt: -1 })
      .limit(8)
      .lean(),

    Product.countDocuments({
      status: "active",
    }),
  ]);

  return {
    heroSlides,

    featuredCategories: {
      items: featuredCategories,
      total: totalCategories,
    },

    featuredStores: {
      items: featuredStores,
      total: totalStores,
    },

    trendingProducts: {
      items: trendingProducts,
      total: totalTrendingProducts,
    },

    newArrivals: {
      items: newArrivals,
      total: totalProducts,
    },
  };
};