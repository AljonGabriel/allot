import asyncHandler from 'express-async-handler';

const addComment = asyncHandler(async (req, res) => {
  const { feUserComment, feCommentedBy } = req.body;

  res.status(200).json(feCommentedBy);
});

export { addComment };
