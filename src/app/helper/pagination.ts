type TPaginatedOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};

const pagination = (paginatedOptions: TPaginatedOptions) => {
  const { page, limit, sortBy, sortOrder } = paginatedOptions;
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;
  const sortWith = sortBy || "createdAt";
  const orderBy = sortOrder || "desc";
  return {
    pageNumber,
    limitNumber,
    skip,
    sortWith,
    orderBy,
  };
};

export default pagination;
