const URL = "https://crmmiddleware.tanesco.co.tz/api/";

export async function signin(username, password) {
  try {
    const res = await fetch(`${URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, /",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    if (error?.message) {
      return error.message;
    } else {
      return "Something went wrong please try again";
    }
  }
}
export async function searchTicket(ticket_id, token) {
  try {
    const res = await fetch(`${URL}search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, /",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ticket_id,
      }),
    });
    const data = await res.json();
    console.log(JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
    if (error?.message) {
      return error.message;
    } else {
      return "Something went wrong please try again";
    }
  }
}
export async function allTickets(token) {
  console.log("I ran", token);
  try {
    const res = await fetch(`${URL}all/tickets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, /",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    console.log(JSON.stringify(data?.data?.tickets));
    return data?.data?.tickets;
  } catch (error) {
    console.log(error);
    if (error?.message) {
      return error.message;
    } else {
      return "Something went wrong please try again";
    }
  }
}

export async function logout(token) {
  console.log("I ran", token);
  try {
    const res = await fetch(`${URL}logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, /",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    console.log(JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
    if (error?.message) {
      return error.message;
    } else {
      return "Something went wrong please try again";
    }
  }
}

export async function updateProfile(token, full_name, phone, email, password) {
  try {
    const res = await fetch(`${URL}update/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, /",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        full_name, email, phone, password
      })
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    if (error?.message) {
      return error.message;
    } else {
      return "Something went wrong please try again";
    }
  }
}

export async function update(token, ticket_id, status, resolution) {
  try {
    const res = await fetch(`${URL}update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, /",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ticket_id, status, comments: resolution
      })
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    if (error?.message) {
      return error.message;
    } else {
      return "Something went wrong please try again";
    }
  }
}
