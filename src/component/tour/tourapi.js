export const tourapi = async () => {
  return await fetch(`http://192.168.100.90:3500/api/v1/tours`)
    .then((response) => response.json())
    .catch((err) => err);
};

export const createTourApi = async (data) => {
  return await fetch(`http://192.168.100.90:3500/api/v1/tours`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
export const updateTourApi = async ({ id, data }) => {
  return await fetch(`http://192.168.100.90:3500/api/v1/tours/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deleteTourApi = async (id) => {
  return await fetch(`http://192.168.100.90:3500/api/v1/tours/${id}`, {
    method: "DELETE",
  });
};
