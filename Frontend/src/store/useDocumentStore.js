import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { useFormStatus } from "../contexts/AdmissionFormContext.jsx"; // Import hook

const useDocumentStore = create((set, get) => ({
  // ✅ State
  availableDocs: [
    { value: "passportsizephoto", label: "Passport Size Photo" },
    { value: "cnic", label: "CNIC/B-Form" },
    { value: "marksheet12", label: "12th Mark Sheet" },
    { value: "marksheet10", label: "10th Mark Sheet" },
    { value: "domicileB", label: "Domicile (For Bachelors)" },
    { value: "domicileCert", label: "Domicile Certificate" },
  ],
  uploadedDocs: [],
  selectedDoc: "",
  file: null,
  loading: true,
  hasFetched: false,
  error: null,

  // ✅ Actions
  setSelectedDoc: (doc) => set({ selectedDoc: doc }),
  setFile: (file) => set({ file }),

  // ✅ Fetch uploaded documents
  fetchUploadedDocuments: async (updateFormStatus) => {
    const { hasFetched, availableDocs } = get();
    const cnic = Cookies.get("cnic");
    if (hasFetched || !cnic) return false;

    try {
      const response = await axios.get(
        `http://localhost:3306/api/getUploadedDocuments/${cnic}`
      );

      if (response.status === 200 && Array.isArray(response.data)) {
        const newDocs = response.data.map((doc) => ({
          docType: doc.docType,
          docName: doc.docName,
          fileName: doc.fileName,
          documentId: doc.id,
          fileSize: doc.fileSize,
          uploadDate: doc.uploadDate,
        }));

        set({
          uploadedDocs: newDocs,
          loading: false,
          hasFetched: true,
          error: null,
          availableDocs: availableDocs.filter(
            (doc) => !newDocs.some((d) => d.docType === doc.value)
          ),
        });

        // ✅ Check completion status
        const allUploaded = newDocs.length >= 6; // total required documents
        if (allUploaded && updateFormStatus) {
          updateFormStatus("photographAndDocument", "Completed");
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching uploaded documents:", error);
      set({ loading: false, error: error.message });
      return false;
    }
  },

  // ✅ Upload a new document
  uploadDocument: async (updateFormStatus) => {
    const { selectedDoc, file, availableDocs, addUploadedDoc, uploadedDocs } =
      get();
    const cnic = Cookies.get("cnic");
    if (!selectedDoc || !file || !cnic)
      return alert("Please select a document type and file.");

    try {
      const docLabel =
        availableDocs.find((doc) => doc.value === selectedDoc)?.label ||
        selectedDoc;

      const formData = new FormData();
      formData.append("cnic", cnic);
      formData.append("docType", selectedDoc);
      formData.append("docName", docLabel);
      formData.append("document", file);

      const response = await axios.post(
        "http://localhost:3306/api/uploadDocument",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000,
        }
      );

      if (response.data.message === "Document uploaded successfully!") {
        const newDoc = {
          docType: selectedDoc,
          docName: docLabel,
          fileName: response.data.fileName,
          documentId: response.data.documentId,
          fileSize: response.data.fileSize,
          uploadDate: new Date().toISOString(),
        };

        addUploadedDoc(newDoc);
        alert("File uploaded successfully!");
        set({ selectedDoc: "", file: null });

        // ✅ Check completion after upload
        const allUploaded = uploadedDocs.length + 1 >= 6; // total required documents
        if (allUploaded && updateFormStatus) {
          updateFormStatus("photographAndDocument", "Completed");
        }

        return true;
      } else {
        alert("Failed to upload file.");
        return false;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed. Please try again.");
      return false;
    }
  },

  // ✅ Add document locally
  addUploadedDoc: (doc) =>
    set((state) => ({
      uploadedDocs: [...state.uploadedDocs, doc],
      availableDocs: state.availableDocs.filter((d) => d.value !== doc.docType),
    })),

  // ✅ Remove document (locally + API)
  removeUploadedDoc: async (docType, documentId, updateFormStatus) => {
    try {
      if (documentId) {
        await axios.delete(
          `http://localhost:3306/api/deleteDocument/${documentId}`
        );
      }
      set((state) => {
        const removedDoc = state.uploadedDocs.find(
          (doc) => doc.docType === docType
        );
        return {
          uploadedDocs: state.uploadedDocs.filter(
            (doc) => doc.docType !== docType
          ),
          availableDocs: removedDoc
            ? [
                ...state.availableDocs,
                { value: removedDoc.docType, label: removedDoc.docName },
              ]
            : state.availableDocs,
        };
      });

      alert("Document removed successfully!");

      // ✅ If removed, mark as pending again
      const { uploadedDocs } = get();
      if (uploadedDocs.length < 6 && updateFormStatus) {
        updateFormStatus("photographAndDocument", "Pending");
      }
      const allUploaded = availableDocs.length === 0 && uploadedDocs.length > 0;
      updateFormStatus(
        "photographAndDocument",
        allUploaded ? "Completed" : "Pending"
      );
    } catch (error) {
      console.error("Error removing document:", error);
      alert("Failed to remove document.");
    }
  },
}));

export default useDocumentStore;
