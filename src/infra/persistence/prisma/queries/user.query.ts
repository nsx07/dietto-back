export const UserDtoQuery = {
  select: {
    id: true,
    name: true,
    email: true,
    isActive: true,
    updatedAt: true,
    createdAt: true,
  },
};

export const UserCredentialsDtoQuery = {
  select: {
    id: true,
    email: true,
    passwordHash: true,
  },
};
