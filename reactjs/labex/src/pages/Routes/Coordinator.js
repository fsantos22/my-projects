export const goToHomePage = (history) => {
  history.push("/");
};

export const goToLoginPage = (history) => {
  history.push("/login");
};

export const goToAdminPage = (history) => {
  history.push("/admin");
};

export const goToListTripsPage = (history) => {
  history.push("/trips/list");
};

export const goToCreateTripPage = (history) => {
  history.push("/trips/create");
};

export const goToTripDetailsPage = (history, id) => {
  history.push("/trips/details/:id");
};

