const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const validateIdParam = (req, res, next) => {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({ message: 'id tidak valid' });
  }

  req.productId = id;
  next();
};

const validateIdBody = (req, res, next) => {
  const id = parseId(req.body.id);

  if (id === null) {
    return res.status(400).json({ message: 'id tidak valid' });
  }

  req.body.id = id;
  next();
};

const validateProduct = (req, res, next) => {
  const { name, price } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'name wajib diisi' });
  }

  if (!Number.isInteger(price) || price < 0) {
    return res.status(400).json({ message: 'price wajib berupa bilangan bulat minimal 0' });
  }

  req.body.name = name.trim();
  next();
};

module.exports = { validateIdParam, validateIdBody, validateProduct };
