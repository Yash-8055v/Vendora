import { uploadImage } from "../../media/services/upload.service.js";
import Hero from "../models/hero.model.js";

export const createHeroService = async (data, file) => {
  const image = await uploadImage({
    file,
    folder: "vendora/hero",
  });

  await Hero.updateMany(
    {
      order: { $gte: data.order },
      status: { $ne: "deleted" },
    },
    {
      $inc: { order: 1 },
    },
  );

  const hero = await Hero.create({
    ...data,
    image,
  });

  return hero;
};

export const getHeroSlidesService = async () => {
  const currentDate = new Date();

  const heroSlides = await Hero.find({
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
    .lean();

  return heroSlides.map((hero) => ({
    ...hero,
    image: {
      url: hero.image.url,
    },
  }));
};

export const getAdminHeroSlidesService = async ({
  page,
  limit,
  search,
  status,
  sort,
}) => {
  const query = {
    status: {
      $ne: "deleted",
    },
  };

  // Search
  if (search) {
    query.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // Status Filter
  if (status) {
    query.status = status;
  }

  // Sorting
  let sortOption = {
    order: 1,
  };

  switch (sort) {
    case "newest":
      sortOption = {
        createdAt: -1,
      };
      break;

    case "oldest":
      sortOption = {
        createdAt: 1,
      };
      break;

    case "title":
      sortOption = {
        title: 1,
      };
      break;

    default:
      sortOption = {
        order: 1,
      };
  }

  const skip = (page - 1) * limit;

  const heroSlides = await Hero.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const totalHeroSlides = await Hero.countDocuments(query);

  const totalPages = Math.ceil(totalHeroSlides / limit);

  return {
    heroSlides,
    totalHeroSlides,
    totalPages,
  };
};

export const getHeroByIdService = async (heroId) => {
  const hero = await Hero.findOne({
    _id: heroId,
    status: {
      $ne: "deleted",
    },
  }).lean();

  if (!hero) {
    throw new Error("Hero slide not found");
  }

  return hero;
};

export const updateHeroService = async (heroId, data, file) => {
  const hero = await Hero.findOne({
    _id: heroId,
    status: { $ne: "deleted" },
  });

  if (!hero) {
    throw new Error("Hero slide not found");
  }

  if (file) {
    hero.image = await replaceImage({
      oldPublicId: hero.image?.publicId,
      file,
      folder: "vendora/hero",
    });
  }

  const oldOrder = hero.order;

  const totalHeroes = await Hero.countDocuments({
    status: {
      $ne: "deleted",
    },
  });

  const newOrder = Math.min(totalHeroes, Math.max(1, Number(updateData.order)));

  if (updateData.order && updateData.order !== hero.order) {
    if (updateData.order > hero.order) {
      // Moving Down
      await Hero.updateMany(
        {
          order: {
            $gt: oldOrder,
            $lte: newOrder,
          },
          status: {
            $ne: "deleted",
          },
        },
        {
          $inc: {
            order: -1,
          },
        },
      );
    } else {
      // Moving Up
      await Hero.updateMany(
        {
          order: {
            $gte: newOrder,
            $lt: oldOrder,
          },
          status: {
            $ne: "deleted",
          },
        },
        {
          $inc: {
            order: 1,
          },
        },
      );
    }
  }

  Object.assign(hero, updateData);

  Object.assign(hero, updateData);

  await hero.save();

  return hero;
};


export const toggleHeroStatusService = async (heroId) => {
  const hero = await Hero.findOne({
    _id: heroId,
    status: {
      $ne: "deleted",
    },
  });

  if (!hero) {
    throw new Error("Hero slide not found");
  }

  hero.status =
    hero.status === "active"
      ? "inactive"
      : "active";

  await hero.save();

  return hero;
};

export const deleteHeroService = async (heroId) => {
  const hero = await Hero.findOne({
    _id: heroId,
    status: {
      $ne: "deleted",
    },
  });

  if (!hero) {
    throw new Error("Hero slide not found");
  }

  const deletedOrder = hero.order;

  hero.status = "deleted";

  await hero.save();

  await Hero.updateMany(
    {
      order: {
        $gt: deletedOrder,
      },
      status: {
        $ne: "deleted",
      },
    },
    {
      $inc: {
        order: -1,
      },
    }
  );
};