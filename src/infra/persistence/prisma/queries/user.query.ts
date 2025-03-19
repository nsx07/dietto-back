export const UserDtoQuery = {
  select: {
    id: true,
    email: true,
    user: {
      select: {
        id: true,
        name: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    },
  },
};

export const UserCredentialsDtoQuery = {
  select: {
    userId: true,
    email: true,
    user: {
      select: {
        role: true,
        name: true,
        password: true,
      },
    },
  },
};
