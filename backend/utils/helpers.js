// simple helper to extract pagination/sort/search filters from req.query
const buildQueryOptions = (query, allowedFilters = []) => {
  // pagination
  const page = Math.max(1, parseInt(query.page || 1));
  const limit = Math.max(1, Math.min(100, parseInt(query.limit || 10)));
  const skip = (page - 1) * limit;

  // sort
  // example: ?sort=departureTime:asc or ?sort=price:desc
  let sort = {};
  if (query.sort) {
    const [field, dir] = query.sort.split(":");
    sort[field] = dir === "desc" ? -1 : 1;
  } else {
    sort = { departureTime: 1 };
  }

  // text search
  const q = query.q;

  // build filters only from allowedFilters
  const filters = {};
  allowedFilters.forEach(f => {
    if (query[f] !== undefined) {
      // allow comma separated values -> array match
      if (query[f].includes(",")) filters[f] = { $in: query[f].split(",") };
      else filters[f] = query[f];
    }
  });

  // price range (example) - optional
  if (query.priceMin || query.priceMax) {
    filters.basePrice = {};
    if (query.priceMin) filters.basePrice.$gte = Number(query.priceMin);
    if (query.priceMax) filters.basePrice.$lte = Number(query.priceMax);
  }

  return { page, limit, skip, sort, q, filters };
};

module.exports = { buildQueryOptions };
