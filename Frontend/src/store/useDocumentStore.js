import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const useDocumentStore = create((set, get) => ({
  // ✅ State
  availableDocs: [
    { value: "passportsizephoto", label: "Passport Size Photo" },
    { value: "cnic", label: "CNIC Front & Back/B-Form (PDF)" },
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
  fetchAttempts: 0, // Track fetch attempts
  maxFetchAttempts: 2, // Maximum allowed attempts
  error: null,

  // ✅ Actions
  setSelectedDoc: (doc) => set({ selectedDoc: doc }),
  setFile: (file) => set({ file }),

  // ✅ Fetch uploaded documents
  fetchUploadedDocuments: async () => {
    const { hasFetched, fetchAttempts, maxFetchAttempts, availableDocs } =
      get();
    const cnic = Cookies.get("cnic");

    // Stop if already fetched, no CNIC, or exceeded max attempts
    if (hasFetched || !cnic || fetchAttempts >= maxFetchAttempts) {
      set({ loading: false });
      return false;
    }

    try {
      set({ loading: true, error: null, fetchAttempts: fetchAttempts + 1 });

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

        // Only show success toast on first successful fetch
        if (fetchAttempts === 0 && newDocs.length > 0) {
          toast.success("Uploaded documents loaded successfully!");
        }
        return true;
      }

      set({ loading: false });
      return false;
    } catch (error) {
      // Handle 404 gracefully (no existing data)
      if (error.response && error.response.status === 404) {
        console.warn("No existing documents found for this CNIC.");
        set({
          hasFetched: true,
          loading: false,
          error: null,
        });
        return false;
      }

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to load uploaded documents";

      set({
        loading: false,
        error: errorMessage,
      });

      // Only show error toast on last attempt
      if (get().fetchAttempts >= maxFetchAttempts) {
        toast.error(`Error: ${errorMessage}`);
      }
      return false;
    }
  },

  // ✅ Reset fetch state (useful if you need to refetch)
  resetFetchState: () =>
    set({
      hasFetched: false,
      fetchAttempts: 0,
    }),

  // ✅ Upload a new document
  uploadDocument: async () => {
    const { selectedDoc, file, availableDocs, uploadedDocs } = get();
    const cnic = Cookies.get("cnic");

    // Validation
    if (!selectedDoc) {
      toast.error("Please select a document type");
      return false;
    }

    if (!file) {
      toast.error("Please select a file to upload");
      return false;
    }

    if (!cnic) {
      toast.error("CNIC not found. Please login again.");
      return false;
    }

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

        // Add document locally
        set((state) => ({
          uploadedDocs: [...state.uploadedDocs, newDoc],
          availableDocs: state.availableDocs.filter(
            (d) => d.value !== selectedDoc
          ),
          selectedDoc: "",
          file: null,
        }));

        toast.success("Document uploaded successfully!");
        return true;
      } else {
        toast.error("Failed to upload document");
        return false;
      }
    } catch (error) {
      let errorMessage = "Failed to upload document";

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message;
      }

      console.error("Error uploading file:", error);
      toast.error(errorMessage);
      return false;
    }
  },

  // ✅ Remove document (locally + API)
  removeUploadedDoc: async (docType, documentId) => {
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

      toast.success("Document removed successfully!");
      return true;
    } catch (error) {
      let errorMessage = "Failed to remove document";

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message;
      }

      console.error("Error removing document:", error);
      toast.error(errorMessage);
      return false;
    }
  },

  // ✅ Check if all documents are uploaded
  checkAllDocumentsUploaded: () => {
    const { availableDocs } = get();
    return availableDocs.length === 0;
  },

  // ✅ Clear errors
  clearError: () => set({ error: null }),
}));

export default useDocumentStore;
