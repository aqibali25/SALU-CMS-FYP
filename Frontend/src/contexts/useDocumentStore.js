import { create } from "zustand";

const useDocumentStore = create((set, get) => ({
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
  fileData: null,
  previewImage: null,
  uploading: false,

  // Actions
  setSelectedDoc: (doc) => set({ selectedDoc: doc }),
  setFile: (file) => set({ file }),
  setFileData: (fileData) => set({ fileData }),
  setPreviewImage: (image) => set({ previewImage: image }),
  setUploading: (status) => set({ uploading: status }),
  disableUpload: () => set({ uploadDisabled: true }),

  addUploadedDoc: (doc) =>
    set((state) => ({
      uploadedDocs: [...state.uploadedDocs, doc],
      availableDocs: state.availableDocs.filter((d) => d.value !== doc.docType),
      selectedDoc: "",
      file: null,
      fileData: null,
      previewImage: null,
    })),

  removeUploadedDoc: (docType) =>
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
    }),
}));

export default useDocumentStore;
