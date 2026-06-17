import axios from "axios";

export const ApiForm = async (title: string, description: string, file: File | null) => {
  try {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("img", file || new Blob()); // Si file es null, se envía un Blob vacío

    const res = await axios.post("/api/Form", formData);

    return res;
  } catch (err) {
    console.error(err);
  }
};

export const fetchFiles = async () => {
  try {
    const resp = await axios.get("/api/Form");

    return resp.data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const deleteFile = async (id: string) => {
  try {
    await axios.delete("/api/Form", {
      data: { id },
    });
  } catch (err) {
    console.error(err);
  }
};